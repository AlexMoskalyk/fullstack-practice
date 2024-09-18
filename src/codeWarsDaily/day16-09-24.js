// Fellow code warrior, we need your help! We seem to have lost one of our sequence elements, and we need your help to retrieve it!

// Our sequence given was supposed to contain all of the integers from 0 to 9 (in no particular order), but one of them seems to be missing.

// Write a function that accepts a sequence of unique integers between 0 and 9 (inclusive), and returns the missing element.

// Examples:
// [0, 5, 1, 3, 2, 9, 7, 6, 4] --> 8
// [9, 2, 4, 5, 7, 0, 8, 6, 1] --> 3

const getMissingElement1 = arr => {
  const totalSum = 45;
  const currentSum = arr.reduce((acc, num) => acc + num, 0);
  return totalSum - currentSum;
};
console.log(getMissingElement1([0, 5, 1, 3, 2, 9, 7, 6, 4]));
console.log(getMissingElement1([9, 2, 4, 5, 7, 0, 8, 6, 1]));

const getMissingElement2 = arr => {
  const fullSet = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const arrSet = new Set(arr);

  for (let num of fullSet) {
    if (!arrSet.has(num)) {
      return num;
    }
  }
};

console.log(getMissingElement2([0, 5, 1, 3, 2, 9, 7, 6, 4]));
console.log(getMissingElement2([9, 2, 4, 5, 7, 0, 8, 6, 1]));

const getMissingElement3 = arr => {
  for (let i = 0; i < 10; i += 1) {
    if (!arr.includes(i)) return i;
  }
};
console.log(getMissingElement3([0, 5, 1, 3, 2, 9, 7, 6, 4]));
console.log(getMissingElement3([9, 2, 4, 5, 7, 0, 8, 6, 1]));
