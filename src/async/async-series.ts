// 异步函数的串行
import type { AsyncTask } from './_util';
// way1: 使用 async/await
// way2: 使用数组的 reduce 方法

export async function asyncInSeries<T>(tasks: AsyncTask<T>[]) {
  const result: T[] = [];
  for (const task of tasks) {
    const data = await task();
    result.push(data);
  }

  return result;
}

export async function asyncInSeries_reduce<T>(tasks: AsyncTask<T>[]) {
  return tasks.reduce((promiseChain, curTask) => {
    return promiseChain.then(chainRes => {
      return curTask().then(curRes => [...chainRes, curRes]);
    });
  }, Promise.resolve([]));
}
