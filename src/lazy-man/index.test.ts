// 1. 每个函数调用都返回this，保证链式调用
// 问题：如何控制函数的执行？
//

// LazyMan('Jack', console.log); //  Hi, I'm Jack.

// He can eat(food: string)
// LazyMan('Jack', console.log).eat('banana').eat('apple')
// Hi, I'm Jack.
// Eat banana.
// Eat Apple.

// He also sleep(time: number), time is based on seconds.
// LazyMan('Jack', console.log).eat('banana').sleep(10).eat('apple').sleep(1)
// Hi, I'm Jack.
// Eat banana.
// (after 10 seconds)
// Wake up after 10 seconds.
// Eat Apple.
// (after 1 second)
// Wake up after 1 second.

// He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.
// LazyMan('Jack', console.log).eat('banana').sleepFirst(10).eat('apple').sleep(1)
// (after 10 seconds)
// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// (after 1 second)
// Wake up after 1 second.

import { LazyMan } from './index';

test.skip('LazyMan should work', async function () {
  LazyMan('Jack', console.log);
  LazyMan('Jack', console.log).eat('banana').eat('apple');
  LazyMan('Jack', console.log).eat('banana').sleep(10).eat('apple').sleep(1);
  LazyMan('Jack', console.log).eat('banana').sleepFirst(10).eat('apple').sleep(1);
});
