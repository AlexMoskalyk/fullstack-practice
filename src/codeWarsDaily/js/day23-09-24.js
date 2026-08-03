// When provided with a letter, return its position in the alphabet.

// Input :: "a"

// Output :: "Position of alphabet: 1"

// Note: Only lowercased English letters are tested

const position = letter => {
  const alphabetLowercase = [...'abcdefghijklmnopqrstuvwxyz'];
  const positionInAlphabet =
    alphabetLowercase.findIndex(item => item === letter) + 1;
  return `Position of alphabet: ${positionInAlphabet}`;
};

console.log(position('c'));
