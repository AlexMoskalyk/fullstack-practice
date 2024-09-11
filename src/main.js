const fn = arr => {
  let distinctValues = [...new Set(arr)];
  return distinctValues;
};

// Example call
console.log(fn([4, 10, 10, 9]));
