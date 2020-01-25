import ApexCharts from 'apexcharts';
import { IDataPoint } from 'data-series-compression';

export class Chart {
  private data: [number, number][];
  private readonly instance: ApexCharts;

  public constructor(id: string, label: string, dataPoints: IDataPoint[]) {
    this.data = Chart.getDataFromDataPoints(dataPoints);
    this.instance = new ApexCharts(
      document.querySelector(`#${id}`),
      Chart.getDefaultOptions(label, this.data)
    );
    this.instance.render();
  }

  public get points(): number {
    return this.data.length;
  }

  public update(dataPoints: IDataPoint[]): void {
    this.data = Chart.getDataFromDataPoints(dataPoints);
    this.instance.updateSeries([
      {
        name: "Value",
        data: this.data
      }
    ]);
  }

  private static getDefaultOptions(
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

  private static getDataFromDataPoints(
    dataPoints: IDataPoint[]
  ): [number, number][] {
    return dataPoints.map((point: IDataPoint) => {
      return [point.time.getTime(), point.value];
    });
  }
}
