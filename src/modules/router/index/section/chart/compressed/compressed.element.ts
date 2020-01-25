import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';
import { CompressionService, IDataPoint } from 'data-series-compression';

import { EGlobalEvent } from 'common/events/global';

import { Chart } from '../chart.model';

import { DataSetService } from './../../../../../data-set/data-set.service';
import { OptionsService } from './../../options/options.service';

@autoinject()
export class CompressedChartCustomElement {
  private compression: CompressionService;
  private chart: Chart | null = null;
  private static LABEL: string = "Compressed data";
  protected readonly id: string = "compressed-chart";

  public constructor(
    private readonly options: OptionsService,
    private readonly data: DataSetService,
    private readonly eventAggregator: EventAggregator
  ) {
    this.compression = this.getCompressionService();
  }

  private getCompressionService(): CompressionService {
    return new CompressionService(
      this.options.deviation / 100,
      this.options.rounds
    );
  }
  private getDataPoints(): IDataPoint[] {
    return this.compression.compressByRounds(this.data.get().points);
  }

  private refresh(): void {
    this.chart.update(this.getDataPoints());
  }

  private optionsChanged(): void {
    this.compression = this.getCompressionService();
    this.refresh();
  }

  private dataSetChanged(): void {
    this.refresh();
  }

  public bind() {
    this.eventAggregator.subscribe(
      EGlobalEvent.OPTIONS_CHANGED,
      this.optionsChanged.bind(this)
    );
    this.eventAggregator.subscribe(
      EGlobalEvent.DATASET_CHANGED,
      this.dataSetChanged.bind(this)
    );
  }

  public attached(): void {
    this.chart = new Chart(
      this.id,
      CompressedChartCustomElement.LABEL,
      this.getDataPoints()
    );
  }
}
