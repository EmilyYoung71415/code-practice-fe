// 数组去重
export function unique1(nums: number[]) {
  return [...new Set(nums)];
}

export function unique2(nums: number[]) {
  const _set = new Set();

  for (let item of nums) {
    if (!_set.has(item)) {
      _set.add(item);
    }
  }

  return [..._set.values()];
}

export function unique(nums: number[]) {
  return nums.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
}
