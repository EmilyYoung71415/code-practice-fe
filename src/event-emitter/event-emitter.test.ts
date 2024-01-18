// // 测试
// const emitter = new EventEmitter();
// const testListener = (message: string) => {
//   console.log(`Received message: ${message}`);
// };
// emitter.on('test', testListener);
// emitter.emit('test', 'Hello World'); // Outputs: "Received message: Hello World"
// emitter.off('test', testListener);
// emitter.emit('test', 'Hello Again'); // No output
