// 防抖，频繁触发时只有最后一次管用
// node.onMouseMove = debounce(mouseMoveFunc, 1e3);
export function debounce(func: Function, wait: number) {
  let timeout: null | NodeJS.Timeout = null;

  return function() {
    const context = this;
    const args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
      func.apply(args, context);
    }, wait);
  }
}


// 进阶
// 1. 防抖支持cancel
// 2. 支持立即执行
// 3. 函数可能会有返回值

// const debouncedMove = debounce(mouseMoveFunc, 1e3);
// node.onMouseMove = debouncedMove;
// debouncedMove.cancel(); // 取消
export function debounce2(func: Function, wait: number, immediate: boolean) {
  let timeout: null | NodeJS.Timeout = null;
  let result: string | number | null = null;

  const _debounced = function() {
    const context = this;
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      // 如果已执行过，就不再执行
      const callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);

      if (callNow) {
        result = func.apply(args, context);
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(args, context);
      }, wait);
    }

    return result;
  }


  _debounced.cancel = function() {
    if (!timeout) return;
    clearTimeout(timeout);
    timeout = null;
  }

  return _debounced;
}