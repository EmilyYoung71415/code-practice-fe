import { test, expect } from 'vitest';
import { flatten } from './flatten';

test('flatten numbers', () => {
  const num1 = [1, [2, [4, 5]]];
  const num2 = [1, 2, 4, 5];
  expect(flatten(num1)).toStrictEqual(num2);
});