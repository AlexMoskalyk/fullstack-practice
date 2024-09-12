// Scenario
// A construction master applies specific rules when creating walls. But the construction master cannot calculate the exact number of bricks to be spent on the walls.

// For this reason, you are expected to write a method that calculates the number of bricks that need to be spent for the wall whose width and height are clear.

// Rules
// Only 3 kinds of bricks can be used. Large Brick(60 cm), Medium Brick(40 cm) and Small Brick(20cm)
// The height of all bricks is 5 cm and wall height is always 5 cm and multiples.
// The Wall width is always 60 cm and multiples.
// The lowest row should be composed of only large bricks.
// After that, the first brick from the right of the next row must be the middle brick, the first brick from the left is the small brick.
// Finally, The first brick from the right of the next row must be the small brick, the first brick from the left is the medium brick.
// The first row after the series is completed again consists of large bricks and the cycle continues.
// The number of bricks used should return to the following format. "21L6M6S"
// If number of medium and small bricks is 0, then answer should be the following format. "21L"

// Wall height is 45 cm and wall width is 180 cm. There are 21 large bricks. There are 6 medium bricks. There are 6 small bricks.

// So answer is "21L6M6S"

const calculateBricksCount = (width, height) => {
  const largeBrick = 60;
  const mediumBrick = 40;
  const smallBrick = 20;

  let largeCount = 0;
  let mediumCount = 0;
  let smallCount = 0;

  const rows = height / 5;
  for (let i = 1; i <= rows; i += 1) {
    if (i % 3 === 1) {
      largeCount += width / largeBrick;
    } else if (i % 3 === 2) {
      mediumCount += 1;
      smallCount += 1;
      const remainingWidth = width - mediumBrick - smallBrick;
      largeCount += remainingWidth / largeBrick;
    } else if (i % 3 === 0) {
      smallCount += 1;
      mediumCount += 1;
      const remainingWidth = width - mediumBrick - smallBrick;
      largeCount += remainingWidth / largeBrick;
    }
  }

  let result = `${largeCount}L`;
  if (mediumCount > 0) {
    result += `${mediumCount}M`;
  }
  if (smallCount > 0) {
    result += `${smallCount}S`;
  }

  return result;
};
