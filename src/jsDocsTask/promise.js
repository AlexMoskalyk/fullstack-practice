const promiseResolved = new Promise(resolve => {
  setTimeout(() => resolve('Promise resolve'), 2000);
});

promiseResolved.then(message => {
  console.log(message);
});

const promiseRejected = new Promise(reject => {
  setTimeout(() => {
    reject(new Error('Promise rejected!'));
  }, 2000);
});

promiseRejected.catch(error => {
  console.error(error.message);
});
