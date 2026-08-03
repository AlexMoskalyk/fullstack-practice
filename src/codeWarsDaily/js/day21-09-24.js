// Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.

// Examples
// "This is an example!" ==> "sihT si na !elpmaxe"
// "double  spaces"      ==> "elbuod  secaps"

const reverseWords = str => {
  return str.split('').reverse().join('').split(' ').reverse().join(' ');
};

// ========================================================

// Complete the method that takes a boolean value and return a "Yes" string for true, or a "No" string for false.

const boolToWord = bool => {
  return bool ? 'Yes' : 'No';
};

// ========================================================

// Take an array and remove every second element from the array. Always keep the first element and start removing with the next element.

// Example:
// ["Keep", "Remove", "Keep", "Remove", "Keep", ...] --> ["Keep", "Keep", "Keep", ...]

// None of the arrays will be empty, so you don't have to worry about that!

const removeEveryOther = arr => {
  return arr.filter((_, index) => index % 2 === 0);
};
