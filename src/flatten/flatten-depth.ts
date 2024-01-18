// flatten(arr, depth); 新增depth参数限制展平层级
// flatten([[1, 2, [3, 4, 5]]], 2) // [1, 2, [3, 4, 5]]
import type { NestedArray } from './_type';

export function flattenDepth<T>(arr: NestedArray<T>, depth: number) {
  if (depth === 1) return arr; // 注意是等于1

  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      newArr = newArr.concat(flattenDepth(item, --depth));
    } else {
      newArr.push(item);
    }
  }

  return newArr;
}
