import { _toString } from './index';

test('toString should work', () => {
  const input = {
    a: 1,
    b: 'string',
    bar: [{ x: 1 }],
    foo: {
      y: 2,
    },
  } as Object;
  const expected = ['obj.a: 1', 'obj.b: string', 'obj.bar.0.x: 1', 'obj.foo.y: 2'];
  const res = _toString(input);
  expect(res).toStrictEqual(expected);
});
