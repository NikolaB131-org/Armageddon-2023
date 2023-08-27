import { prettifyDate } from '@/utils/prettifyDate';

describe('prependZero', () => {
  test('когда часы близко к 00:00', () => {
    const date = new Date(Date.UTC(2023, 7, 20, 23, 24, 0));
    expect(prettifyDate(date)).toBe('20\xa0авг\xa02023');
  });

  test('когда часы после 00:00', () => {
    const date = new Date(Date.UTC(2023, 3, 20, 0, 24, 0));
    expect(prettifyDate(date)).toBe('20\xa0апр\xa02023');
  });

  test('когда год скоро изменится', () => {
    const date = new Date(Date.UTC(2023, 11, 31, 23, 35, 0));
    expect(prettifyDate(date)).toBe('31\xa0дек\xa02023');
  });
});
