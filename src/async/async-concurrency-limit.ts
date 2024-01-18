// 实现这样一个函数，传入待执行的promise函数,并发数限制, 实现这样的并发执行函数
// asyncConcurrencyLimit(promiseTasks, limitCount).then(results => { console.log(results)});
import type { AsyncTask } from './_util';

// 这个实现比较优雅，但比较不容易想到
// 核心是：当这个数量达到时，我们使用 Promise.race() 等待其中一个任务完成，然后继续添加更多的任务，直到所有任务都被触发。
export async function asyncConcurrencyLimit<T>(promiseTasks: AsyncTask<T>[], limitCount: number) {
  let activeTasks: Promise<T>[] = [];
  let results: Promise<T>[] = [];

  for (let i = 0; i < promiseTasks.length; i++) {
    const curTaskPromise = promiseTasks[i](); // 立即调用执行
    // 把执行中的promise放在队列里
    activeTasks.push(curTaskPromise);
    // 执行结果也是按顺序存放的
    results.push(curTaskPromise);

    // check是否已超出限制 or 已执行到末尾了
    if (activeTasks.length >= limitCount || i === promiseTasks.length - 1) {
      // 等待至少一个任务完成
      await Promise.race(activeTasks);
      // activeTasks中移除已完成的任务
      activeTasks = activeTasks.filter(activePromise => activePromise !== curTaskPromise);
    }
  }

  // 等待所有结果的返回
  return Promise.all(results);
}

// 这个是比较容易想到的
export async function asyncConcurrencyLimit2<T>(promiseTasks: AsyncTask<T>[], limitCount: number) {
  let activeCount = 0; // 当前执行中的，开始执行++， 执行完成--, 确保不会超过limit
  let index = 0;
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    function runNext() {
      if (index === promiseTasks.length && activeCount === 0) {
        resolve(results);
        return;
      }

      // 确保最多有limit个在执行
      while (index < promiseTasks.length && activeCount < limitCount) {
        activeCount++;
        // 多声明一个curIndex是为了保证 results[curIndex]顺序记录结果的， cause .then的时候index不一定等于执行时的curIndex了
        const curIndex = index;
        promiseTasks[curIndex]()
          .then(data => {
            results[curIndex] = data;
          })
          .catch(err => {
            reject(err);
            // TODO: 可新增逻辑：失败后最大重试次数为retryCount
          })
          .finally(() => {
            activeCount--;
            runNext();
          });
        index++;
      }
    }

    runNext();
  });
}

// asyncConcurrencyLimit2.then(all Done).catch(err);
