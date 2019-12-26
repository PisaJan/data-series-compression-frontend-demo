import ApexCharts from 'apexcharts';
import { observable } from 'aurelia-binding';
import { CompressionService, IDataPoint } from 'data-series-compression';

import { UnreachableCaseException } from 'common/exceptions/unreachable-case/unreachable-case.exception';

import environment from '../../../environment';
import { DataSet } from '../../data-set/data-set.model';

import { EDataSet } from './../../data-set/data-set.enum';

export class IndexRoute {
  private readonly compression: CompressionService = new CompressionService(
    0.05
  );
  protected readonly originalChart: {
    id: string;
    label: string;
    points: number;
    instance: ApexCharts | null;
  } = {
    id: "original-chart",
    label: "Original data",
    points: 0,
    instance: null
  };
  protected readonly compressedChart: {
    id: string;
    label: string;
    points: number;
    instance: ApexCharts | null;
  } = {
    id: "compressed-chart",
    label: "Compressed data",
    points: 0,
    instance: null
  };
  protected readonly dataSets: Map<EDataSet, string> = new Map([
    [EDataSet.SMALL, "Small dataset"],
    [EDataSet.MEDIUM, "Medium dataset"],
    [EDataSet.LARGE, "Large dataset"]
  ]);
  protected smallDataSet: DataSet = new DataSet(environment.dataSet.small.size);
  protected mediumDataSet: DataSet = new DataSet(
    environment.dataSet.medium.size
  );
  protected largeDataSet: DataSet = new DataSet(environment.dataSet.large.size);
  @observable()
  protected dataSet: EDataSet = EDataSet.SMALL;
  protected selectedDataSet: DataSet = this.smallDataSet;
  private loaded: boolean = false;

  private renderCharts(): void {
    const originalData: IDataPoint[] = this.selectedDataSet.points;
    this.originalChart.points = originalData.length;
    this.originalChart.instance = IndexRoute.renderChart(
      this.originalChart.id,
      this.originalChart.label,
      originalData
    );
    const compressedData: IDataPoint[] = this.compression.compressByRounds(
      this.selectedDataSet.points,
      5
    );
    this.compressedChart.points = compressedData.length;
    this.compressedChart.instance = IndexRoute.renderChart(
      this.compressedChart.id,
      this.compressedChart.label,
      compressedData
    );
  }
  private updateCharts(): void {
    const originalData: IDataPoint[] = this.selectedDataSet.points;
    this.originalChart.points = originalData.length;
    this.originalChart.instance.updateSeries([
      {
        name: "Value",
        data: IndexRoute.getChartData(originalData)
      }
    ]);
    const compressedData: IDataPoint[] = this.compression.compressByRounds(
      this.selectedDataSet.points,
      5
    );
    this.compressedChart.points = compressedData.length;
    this.compressedChart.instance.updateSeries([
      {
        name: "Value",
        data: IndexRoute.getChartData(compressedData)
      }
    ]);
  }

  protected dataSetChanged(): void {
    if (!this.loaded) {
      return;
    }
    switch (this.dataSet) {
      case EDataSet.SMALL:
        this.selectedDataSet = this.smallDataSet;
        break;
      case EDataSet.MEDIUM:
        this.selectedDataSet = this.mediumDataSet;
        break;
      case EDataSet.LARGE:
        this.selectedDataSet = this.largeDataSet;
        break;
      default:
        throw new UnreachableCaseException(this.dataSet);
    }
    this.updateCharts();
  }

  protected refreshData(): void {
    this.smallDataSet = new DataSet(environment.dataSet.small.size);
    this.mediumDataSet = new DataSet(environment.dataSet.medium.size);
    this.largeDataSet = new DataSet(environment.dataSet.large.size);
    this.dataSetChanged();
  }

  public attached(): void {
    this.renderCharts();
    this.loaded = true;
  }

  private static renderChart(
    id: string,
    label: string,
    dataSet: IDataPoint[]
  ): ApexCharts {
    const chartData: [number, number][] = IndexRoute.getChartData(dataSet);
    const chart = new ApexCharts(
      document.querySelector(`#${id}`),
      IndexRoute.getChartOptions(label, chartData)
    );
    chart.render();
    return chart;
  }

  private static getChartData(dataSet: IDataPoint[]): [number, number][] {
    return dataSet.map((point: IDataPoint) => {
      return [point.time.getTime(), point.value];
    });
  }

  private static getChartOptions(
    label: string,
    data: [number, number][]
  ): ApexCharts.ApexOptions {
    return {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      markers: {
        size: 3
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: "Value",
          data: data
        }
      ],
      title: {
        text: label,
        align: "left"
      },
      yaxis: {
        title: {
          text: "Value"
        }
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        shared: false
      }
    };
  }
}
