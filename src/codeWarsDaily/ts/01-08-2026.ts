// Implement a function that computes the difference between two lists. The function should remove all occurrences of elements from the first list (a) that are present in the second list (b). The order of elements in the first list should be preserved in the result.

// Examples
// If a = [1, 2] and b = [1], the result should be [2].

// If a = [1, 2, 2, 2, 3] and b = [2], the result should be [1, 3].

export function arrayDiff(a: number[], b: number[]): number[] {
  const uniquesOfArrayB = new Set(b);

  const result = a.filter(item => !uniquesOfArrayB.has(item));

  return result;
}

// Task
// Your task is to write a function which returns the n-th term of the following series, which is the sum of the first n terms of the sequence (n is the input parameter).
// Series: 1+ 1/4 + 1/7 + 1/10 + 1/13 + 1/16 + 1/19 + 1/22 + 1/25 + 1/28 + ...

// You will need to figure out the rule of the series to complete this.

// Rules
// You need to round the answer to 2 decimal places and return it as String.

// If the given value is 0 then it should return "0.00".

// You will only be given Natural Numbers as arguments.

export function SeriesSum(n: number): string {
  if (n === 0) {
    return '0.00';
  }

  let sum = 0;

  for (let k = 1; k <= n; k++) {
    const denominator = 1 + 3 * (k - 1);
    sum += 1 / denominator;
  }

  return sum.toFixed(2);
}
