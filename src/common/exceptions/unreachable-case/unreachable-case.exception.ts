export class UnreachableCaseException extends Error {
  constructor(value: never) {
    super(`Unreachable case: ${value}`);
    Object.setPrototypeOf(this, UnreachableCaseException.prototype);
  }
}
