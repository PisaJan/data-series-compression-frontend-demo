export class ToIntegerValueConverter {
  public fromView(input: string): number {
    return Number.parseInt(input, 10);
  }
}
