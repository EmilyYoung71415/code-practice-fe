import { flattenDepth } from './flatten-depth';

describe('flatten numbers', () => {
  test('flatten numbers', () => {
    const num1 = [1, [2, [4, 5]]];
    const expected = [1, 2, [4, 5]];
    const result = flattenDepth(num1, 2);
    console.log(result);
    expect(result).toStrictEqual(expected);
  });
});
