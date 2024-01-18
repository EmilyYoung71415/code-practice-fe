import { test, expect } from 'vitest';
import { unique } from './index';

test('unique numbers', () => {
  const num = [1, 2, 3, 4, 2, 1, 3];
  expect(unique(num)).toStrictEqual([1, 2, 3, 4]);
});