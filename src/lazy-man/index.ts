// https://bigfrontend.dev/problem/create-lazyman

interface Laziness {
  sleep: (time: number) => Laziness;
  sleepFirst: (time: number) => Laziness;
  eat: (food: string) => Laziness;
}

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
// export function LazyMan(name: string, logFn: Function) {
//   const p0Tasks: Function[] = [];
//   const lazyTasks: Function[] = [];

//   logFn(`Hi, I'm ${name}`);

//   const _this: Laziness = {
//     eat: function (food: string) {
//       // 异步串行执行
//       (async () => {
//         for (let task of lazyTasks) {
//           await task();
//           logFn(`Eat ${food}`);
//         }
//       })();
//       return _this;
//     },
//     sleep(time: number) {
//       lazyTasks.push(sleep.bind(this, time));
//       return _this;
//     },
//     sleepFirst(timer: number) {
//       return _this;
//     },
//   };

//   return _this;
// }

// 主要思路
// 每次链式调用的时候，往队列push函数的过程
// 而队列的函数何时执行，是在constructor里调用this._run();
// sleepFirst: 队列首
// sleep: 队列push

type LogFn = (str: string) => void;

class LazyManCtor {
  private _tasks: (() => Promise<void>)[] = [];
  private _name: string;
  private _logFn: LogFn;

  constructor(name: string, logFn: LogFn) {
    this._name = name;
    this._logFn = logFn;
    this._tasks.push(async () => {
      await this._logFn(`Hi, I'm ${this._name}.`);
    });

    this._run();
  }

  private async _run() {
    while (this._tasks.length) {
      const task = this._tasks.shift();
      if (task) {
        await task();
      }
    }
  }

  sleep(timer: number): Laziness {
    this._tasks.push(async () => {
      await this._delay(timer);
      await this._logFn(`Wake up after ${timer} seconds.`);
    });
    return this;
  }

  sleepFirst(timer: number): Laziness {
    this._tasks.unshift(async () => {
      await this._delay(timer);
      await this._logFn(`Wake up after ${timer} seconds.`);
    });
    return this;
  }

  eat(food: string): Laziness {
    this._tasks.push(async () => {
      await this._logFn(food);
    });
    return this;
  }

  private _delay(timer: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timer * 1e3));
  }
}

export function LazyMan(name: string, logFn: LogFn): Laziness {
  return new LazyManCtor(name, logFn);
}
