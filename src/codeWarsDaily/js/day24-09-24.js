// Create a function that checks if a number n is divisible by two numbers x AND y. All inputs are positive, non-zero numbers.

// Examples:
// 1) n =   3, x = 1, y = 3 =>  true because   3 is divisible by 1 and 3
// 2) n =  12, x = 2, y = 6 =>  true because  12 is divisible by 2 and 6
// 3) n = 100, x = 5, y = 3 => false because 100 is not divisible by 3
// 4) n =  12, x = 7, y = 5 => false because  12 is neither divisible by 7 nor 5


const isDivisible = (n, x, y) => {
    return n%x===0 && n%y===0 ? true :false;

}



// =================================================
// Timmy & Sarah think they are in love, but around where they live, they will only know once they pick a flower each. If one of the flowers has an even number of petals and the other has an odd number of petals it means they are in love.

// Write a function that will take the number of petals of each flower and return true if they are in love and false if they aren't.


const lovefunc = (flower1, flower2) =>{
    return (flower1 % 2 === 0 && flower2 %2 ===0) || (flower1 % 2 !== 0 && flower2 %2 !==0) ? false : true;
  }

// =================================================

//   Given an array of integers your solution should find the smallest integer.

// For example:

// Given [34, 15, 88, 2] your solution will return 2
// Given [34, -345, -1, 100] your solution will return -345
// You can assume, for the purpose of this kata, that the supplied array will not be empty.


const findSmallestInt = (arr) => {
    let smallestInt = arr[0];
    for (let i = 1; i < arr.length; i+=1){
      if(smallestInt > arr[i]){
        smallestInt = arr[i]
      }
    }
    return smallestInt;
  }


  