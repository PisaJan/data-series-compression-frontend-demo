import { EDataSet } from 'modules/data-set/data-set.enum';

export class Options {
  private dataSet: EDataSet = Options.DEFAULT_DATA_SET;
  private rounds: number = Options.DEFAULT_ROUNDS;
  private deviation: number = Options.DEFAULT_DEVIATION;
  private static DEFAULT_DATA_SET: EDataSet = EDataSet.SMALL;
  private static DEFAULT_ROUNDS: number = 1;
  private static DEFAULT_DEVIATION: number = 10;

  public getDataSet(): EDataSet {
    return this.dataSet;
  }

  public getRounds(): number {
    return this.rounds;
  }

  public getDeviation(): number {
    return this.deviation;
  }

  public setDataSet(dataSet: EDataSet): void {
    this.dataSet = dataSet;
  }

  public setRounds(rounds: number): void {
    this.rounds = rounds;
  }

  public setDeviation(deviation: number): void {
    this.deviation = deviation;
  }
}
