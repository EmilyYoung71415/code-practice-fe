// 实现这样一个函数，传入待执行的promise函数,并发数限制, 实现这样的并发执行函数
// asyncConcurrencyLimit(promiseTasks, limitCount).then(results => { console.log(results)});
type AsyncTask<T> = () => Promise<T>;

export async function asyncConcurrencyLimit<T>(promiseTasks: AsyncTask<T>[], limitCount: number) {
  let activeTasks: Promise<T>[] = [];
  let results: Promise<T>[] = [];

  for (let i = 0; i < promiseTasks.length; i++) {
    const curTaskPromise = promiseTasks[i](); // 先执行
    activeTasks.push(curTaskPromise); // 把执行结果放在队列里
    results.push(curTaskPromise);

    // 超出限制了or都执行了一遍了
    if (activeTasks.length >= limitCount || i === promiseTasks.length - 1) {
      await Promise.race(activeTasks);
      // 移除已完成的任务
      activeTasks = activeTasks.filter(activePromise => activePromise !== curTaskPromise);
    }
  }

  return Promise.all(results);
}
