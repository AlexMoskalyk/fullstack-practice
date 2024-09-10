//09/09/24
//==========================================
//Your classmates asked you to copy some paperwork for them. You know that there are 'n' classmates and the paperwork has 'm' pages.

// Your task is to calculate how many blank pages do you need. If n < 0 or m < 0 return 0.

// Example:
// n= 5, m=5: 25
// n=-5, m=5:  0

// Solution:

function paperwork(n, m) {
  if (n < 0 || m < 0) {
    return 0;
  }
  return n * m;
}
//==========================================
// Given a string, you have to return a string in which each character (case-sensitive) is repeated once.

// Examples (Input -> Output):
// * "String"      -> "SSttrriinngg"
// * "Hello World" -> "HHeelllloo  WWoorrlldd"
// * "1234!_ "     -> "11223344!!__  "

function doubleChar(str) {
  return str
    .split('')
    .map(char => char + char)
    .join('');
}
//==========================================
// Complete the function that takes two integers (a, b, where a < b) and return an array of all integers between the input parameters, including them.

// For example:

// a = 1
// b = 4
// --> [1, 2, 3, 4]

function between(a, b) {
  // your code here
  let result = [];
  for (i = a; i <= b; i += 1) {
    result.push(i);
  }
  return result;
}
//==========================================
// 10.09.24

// Given an array of integers, find the one that appears an odd number of times.

// There will always be only one integer that appears an odd number of times.

// Examples
// [7] should return 7, because it occurs 1 time (which is odd).
// [0] should return 0, because it occurs 1 time (which is odd).
// [1,1,2] should return 2, because it occurs 1 time (which is odd).
// [0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
// [1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).

function findOdd(A) {
  const counts = {};
  A.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });

  return +Object.keys(counts).find(key => counts[key] % 2 !== 0);
}
