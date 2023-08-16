export function inclineFromNumber(number: number, firstText: string, secondText: string, thirdText: string): string {
  const firstFromEndNumber = Math.abs(number) % 100;
  const secondFromEndNumber = number % 10;
  if (firstFromEndNumber > 10 && firstFromEndNumber < 20) {
    return thirdText;
  }
  if (secondFromEndNumber > 1 && secondFromEndNumber < 5) {
    return secondText;
  }
  if (secondFromEndNumber === 1) {
    return firstText;
  }
  return thirdText;
}
