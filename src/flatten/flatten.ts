// input: [1, [2, [3]]]
// output: [1, 2, 3]

// input: [1, [2, [4, 5]]]
// output: [1, 2, 4, 5]

export function flatten(arr: unknown[]) {
  let newArr: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      newArr = newArr.concat(flatten(item));
    } else {
      newArr.push(item as number);
    }
  }

  return newArr;
}