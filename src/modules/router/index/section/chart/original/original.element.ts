import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';
import { CompressionService, IDataPoint } from 'data-series-compression';

import { EGlobalEvent } from 'common/events/global';

import { Chart } from '../chart.model';

import { DataSetService } from './../../../../../data-set/data-set.service';
import { OptionsService } from './../../options/options.service';

@autoinject()
export class OriginalChartCustomElement {
  private chart: Chart | null = null;
  private static LABEL: string = "Original data";
  protected readonly id: string = "original-chart";

  public constructor(
    private readonly options: OptionsService,
    private readonly data: DataSetService,
    private readonly eventAggregator: EventAggregator
  ) {}

  private getCompressionService(): CompressionService {
    return new CompressionService(this.options.deviation, this.options.rounds);
  }
  private getDataPoints(): IDataPoint[] {
    return this.data.get().points;
  }

  private refresh(): void {
    this.chart.update(this.getDataPoints());
  }

  private optionsChanged(): void {
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
      OriginalChartCustomElement.LABEL,
      this.getDataPoints()
    );
  }
}
