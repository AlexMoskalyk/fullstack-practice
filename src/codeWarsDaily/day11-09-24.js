// Character recognition software is widely used to digitise printed texts. Thus the texts can be edited, searched and stored on a computer.

// When documents (especially pretty old ones written with a typewriter), are digitised character recognition softwares often make mistakes.

// Your task is correct the errors in the digitised text. You only have to handle the following mistakes:

// S is misinterpreted as 5
// O is misinterpreted as 0
// I is misinterpreted as 1
// The test cases contain numbers only by mistake.

const correct = string =>
  string.replace(/5/g, 'S').replace(/0/g, 'O').replace(/1/g, 'I');
//==========================================

// In this kata, your job is to return the two distinct highest values in a list. If there're less than 2 unique values, return as many of them, as possible.

// The result should also be ordered from highest to lowest.

// Examples:

// [4, 10, 10, 9]  =>  [10, 9]
// [1, 1, 1]  =>  [1]
// []  =>  []

const twoHighest = arr => {
  const distinctHighestValues = [];

  arr.forEach(item => {
    if (!distinctHighestValues.includes(item)) {
      distinctHighestValues.push(item);
    }
  });

  distinctHighestValues.sort(
    (firstNumber, secondNumber) => secondNumber - firstNumber
  );

  return distinctHighestValues.splice(0, 2);
};

// А цей варіант я підгледів, новий для мене обьект new Set()

function twoHighest(arr) {
  let distinctValues = [...new Set(arr)];

  distinctValues.sort((a, b) => b - a);

  return distinctValues.slice(0, 2);
}
