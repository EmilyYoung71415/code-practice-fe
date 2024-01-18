// 触发高频事件，且 N 秒内只执行一次。
// 简单版：使用时间戳来实现，立即执行一次，然后每 N 秒执行一次。

export function throttle(func: Function, wait: number) {
  let prev = 0;

  return function() {
    const now = +new Date();
    const ctx = this;
    const args = arguments;

    if (now - prev > wait) {
      func.apply(args, ctx);
      prev = now;
    }
  }
}