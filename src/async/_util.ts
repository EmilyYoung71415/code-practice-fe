export async function mockAsyncFunc(data: number, timer: number, printf: boolean = false) {
  return new Promise(resole => {
    if (printf) {
      console.log('执行中' + timer);
    }
    setTimeout(() => {
      if (printf) {
        console.log('执行done' + timer);
      }
      resole(data);
    }, timer * 100);
  });
}

export type AsyncTask<T> = () => Promise<T>;
