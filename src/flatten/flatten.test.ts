import { flatten } from './flatten';

describe('flatten numbers', () => {
  test('flatten numbers', () => {
    const num1 = [1, [2, [4, 5]]];
    const num2 = [1, 2, 4, 5];
    expect(flatten(num1)).toStrictEqual(num2);
  });
});
