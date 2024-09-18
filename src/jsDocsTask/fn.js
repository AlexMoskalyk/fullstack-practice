const toSum = (a, b) => a + b;
const toUpperCase = str => str.toUpperCase();
const toSquareNumber = arr => arr.map(item => item * item);

console.log('toSum', toSum(1, 2));
console.log('toUpperCase', toUpperCase('abcd'));
console.log('toSquareNumber', toSquareNumber([1, 2, 3, 4, 5]));
