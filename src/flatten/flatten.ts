// input: [1, [2, [3]]]
// output: [1, 2, 3]

// input: [1, [2, [4, 5]]]
// output: [1, 2, 4, 5]

import type { NestedArray } from './_type';

export function flatten<T>(arr: NestedArray<T>): T[] {
  let newArr: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      newArr = newArr.concat(flatten(item));
    } else {
      newArr.push(item);
    }
  }

  return newArr;
}
