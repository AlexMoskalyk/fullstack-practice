const arr = ['Mike', 'John', 'Sara'];
arr.push('newName');
console.log(arr[arr.length - 1]);
const firstDeletedElement = arr.splice(0, 1);
console.log(firstDeletedElement[0]);
