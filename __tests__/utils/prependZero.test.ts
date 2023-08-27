import { prependZero } from '@/utils/prependZero';

describe('prependZero', () => {
  it('должна добавлять 0 перед числом если длина числа = 1', () => {
    expect(prependZero(5)).toBe('05');
    expect(prependZero('5')).toBe('05');
    expect(prependZero(0)).toBe('00');
  });

  it('не должна добавлять 0 перед числом если длина числа != 1', () => {
    expect(prependZero(10)).toBe('10');
    expect(prependZero(111)).toBe('111');
    expect(prependZero('111')).toBe('111');
  });
});
