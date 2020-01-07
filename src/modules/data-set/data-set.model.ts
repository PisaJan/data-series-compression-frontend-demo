import { DataPoint, IDataPoint } from 'data-series-compression';

export class DataSet {
  public readonly points: IDataPoint[] = [];
  private static minimum: number = 0;
  private static maximum: number = 1000;
  private static start: number = 1262300400000; // 1.1.2010
  private static interval: number = 24 * 3600 * 1000; // one day

  public constructor(public readonly size: number) {
    for (let i = 0; i < size; i++) {
      this.points.push(
        DataSet.createRandomPoint(DataSet.start + i * DataSet.interval)
      );
    }
  }

  private static createRandomPoint(timestamp: number): DataPoint {
    return new DataPoint(
      new Date(timestamp),
      Math.floor(
        Math.random() * (DataSet.maximum - DataSet.minimum) - DataSet.minimum
      )
    );
  }
}
