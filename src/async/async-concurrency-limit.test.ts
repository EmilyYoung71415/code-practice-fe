import { asyncConcurrencyLimit, asyncConcurrencyLimit2 } from './async-concurrency-limit';

describe('异步函数并发limit', () => {
  async function mockAsyncFunc(data: number, timer: number) {
    return new Promise(resole => {
      // console.log('执行中' + timer);
      setTimeout(() => {
        // console.log('执行done' + timer);
        resole(data);
      }, timer * 100);
    });
  }

  test('asyncConcurrencyLimit1', async () => {
    const testArrData = Array.from({ length: 7 }, (_, index) => index);
    const promiseTasks = testArrData.map((data, index) => {
      return () => mockAsyncFunc(data, index);
    });
    const limitCount = 3;
    const result = await asyncConcurrencyLimit(promiseTasks, limitCount);
    expect(result).toStrictEqual(testArrData);
  });

  test.only('asyncConcurrencyLimit2', async () => {
    const testArrData = Array.from({ length: 7 }, (_, index) => index);
    const promiseTasks = testArrData.map((data, index) => {
      return () => mockAsyncFunc(data, index);
    });
    const limitCount = 3;
    const result = await asyncConcurrencyLimit2(promiseTasks, limitCount);
    expect(result).toStrictEqual(testArrData);
  });
});
