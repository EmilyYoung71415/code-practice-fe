// @ts-nocheck
// const loadScriptPromiseFunc = promisify(loadScript);
//  loadScriptPromiseFunc(...).then(...);
export function promisify(fn: Function) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...result) {
        if (err) {
          reject(err);
        } else {
          resolve(...result);
        }
      }

      args.push(callback);
      fn.call(this, ...args);
    });
  };
}
