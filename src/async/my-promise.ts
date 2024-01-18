// new Promise(resolveFn, rejectFn).then().catch
// base版
// new Promise(resolve => {
//         setTimeout(() => {
//             resolve(1)
//         }, 500)
//     })
//     .then(res => {
//         console.log(res)
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(2)
//             }, 500)
//         })
//     })
//     .then(console.log)
// 500ms后输出1， 又500ms后输出2

/****
 * 实现思路:
 *   1. new Promise new 传入的函数 constructor 立即得到调用
 *   2. constructor 里的 resolve、reject调用后 promise状态得到改变
 *   3. .then注册回调，一旦 constructor 里的resolve得到调用, .then里的回调函数也会被调用，并得到异步结果值
 *   4. promise支持链式调用 .then后还可以.then
 */
type Executor<T> = (resolve: (value?: T) => void, reject: (reason?: any) => void) => void;
type ResolveFunction<T> = (value?: T | SimplePromise<T>) => void;
type RejectFunction = (reason?: any) => void;

// 调用resolve函数会执行 .then里的回调
// ---> then(cb) 执行时候将cb放入队列里，resolve()时候调用队列的函数

class SimplePromise<T> {
  private _callbacks: Array<(value: T) => void> = [];
  private _catchCallbacks: Array<(reason: any) => void> = [];
  private _status: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private _value?: T;
  private _reason?: any;

  constructor(fn: Executor<T>) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onFullFilled?: (value: T) => void) {
    if (onFullFilled) {
      this._callbacks.push(onFullFilled);
    }

    if (this._status === 'fulfilled' && this._value !== undefined) {
      this._resolve(this._value);
    }

    return this;
  }

  private _resolve(value: T) {
    if (this._status !== 'pending') return;
    this._status = 'fulfilled';
    this._value = value;
    for (const cb of this._callbacks) {
      cb(value);
    }
  }

  catch() {}

  private _reject(err) {
    this._value = err;
  }
}
