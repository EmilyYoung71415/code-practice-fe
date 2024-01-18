import { deepClone } from './index';

test('deepClone', () => {
  const targetObj: Record<string, unknown> = {
    num: 1,
    str: 'string',
    bool: true,
    date: new Date(),
    arr: [1, 2, 3],
    innerObj: {
      test: 'test',
    },
  };

  const clonedObj = deepClone(targetObj);
  Object.keys(targetObj).forEach(key => {
    const target = targetObj[key];
    const newObj = clonedObj[key];
    expect(target !== newObj);
  });
});
