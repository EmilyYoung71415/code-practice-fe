/********************************
 *
 *
 */

// promise.all：并发执行且等待所有的promise执行完成，但是任何一个promise被拒绝就是reject结果
// 实现Promise.allSettled：不想因一个操作失败而中断其他所有操作的情况特别有用

function allSettled<T>(promises: Promise<T>[]) {
  // @ts-ignore
  const rejectHandler = reason => ({ status: 'rejected', reason });
  // @ts-ignore
  const resolveHandler = value => ({ status: 'fulfilled', value });

  return Promise.all(
    promises.map(promise => {
      // 包裹一下以防传递非 promise
      return Promise.resolve(promise).then(resolveHandler, rejectHandler);
    })
  );
}
