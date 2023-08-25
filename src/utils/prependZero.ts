export function prependZero(number: number | string): string {
  const stringNumber = number.toString();
  return stringNumber.length === 1 ? `0${stringNumber}` : stringNumber;
}
