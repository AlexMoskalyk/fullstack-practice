const sayHello = str => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(str), 1000);
  });
};

const runAsyncFn = async fn => {
  try {
    console.log(await fn('Hello World!'));
  } catch (error) {
    console.log(error.message);
  }
};

runAsyncFn(sayHello);
