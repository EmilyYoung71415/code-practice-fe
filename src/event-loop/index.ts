console.log('start');

setTimeout(() => {
  console.log('timeout 1');

  Promise.resolve()
    .then(() => {
      console.log('Promise1 then');
    })
    .then(() => {
      console.log('Promise1 then.then');
    });

  setTimeout(() => {
    console.log('timeout 1-1');

    Promise.resolve()
      .then(() => {
        console.log('Promise1-1 then');
      })
      .then(() => {
        console.log('Promise1-1 then.then');
      });
  });
});

setTimeout(() => {
  console.log('timeout 2');

  Promise.resolve()
    .then(() => {
      console.log('Promise2 then');
    })
    .then(() => {
      console.log('Promise2 then.then');
    });

  setTimeout(() => {
    console.log('timeout 1-1');

    Promise.resolve()
      .then(() => {
        console.log('Promise2-1 then');
      })
      .then(() => {
        console.log('Promise2-1 then.then');
      });
  });
});

console.log('end');
