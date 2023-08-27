import { inclineFromNumber } from '@/utils/inclineFromNumber';

describe('inclineFromNumber', () => {
  it('должна возвращать первый текст', () => {
    expect(inclineFromNumber(1, 'first', 'second', 'third')).toBe('first');
    expect(inclineFromNumber(21, 'first', 'second', 'third')).toBe('first');
    expect(inclineFromNumber(31, 'first', 'second', 'third')).toBe('first');
  });

  it('должна возвращать второй текст', () => {
    expect(inclineFromNumber(3, 'first', 'second', 'third')).toBe('second');
    expect(inclineFromNumber(23, 'first', 'second', 'third')).toBe('second');
  });

  it('должна возвращать третий текст', () => {
    expect(inclineFromNumber(0, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(5, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(7, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(10, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(15, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(18, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(20, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(25, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(111, 'first', 'second', 'third')).toBe('third');
    expect(inclineFromNumber(114, 'first', 'second', 'third')).toBe('third');
  });
});

