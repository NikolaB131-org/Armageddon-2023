import { getIsoDate } from '@/utils/getIsoDate';

describe('getIsoDate', () => {
  test('когда часы близко к 00:00', () => {
    const date = new Date('2023-08-20T23:24:00');
    expect(getIsoDate(date)).toBe('2023-08-20');
  });

  test('когда часы после 00:00', () => {
    const date = new Date('2023-08-20T00:24:00');
    expect(getIsoDate(date)).toBe('2023-08-20');
  });

  test('когда год скоро изменится', () => {
    const date = new Date('2023-12-31T23:35:00');
    expect(getIsoDate(date)).toBe('2023-12-31');
  });
});

