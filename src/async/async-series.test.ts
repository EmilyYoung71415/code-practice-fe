import { mockAsyncFunc } from './_util';
import { asyncInSeries } from './async-series';

test.only('异步函数串行', async () => {
  const testArrData = Array.from({ length: 7 }, (_, index) => index);
  const promiseTasks = testArrData.map((data, index) => {
    return () => mockAsyncFunc(data, index, false);
  });
  const result = await asyncInSeries(promiseTasks);
  expect(result).toStrictEqual(testArrData);
});
