// Perlin Noise is a pseudorandom procedural texture used in various visual effects generation but also procedural world generation. Noise algorithms are used for generating world in video games like Minecraft, No Man's Sky, Noita, etc...

// In this kata you should use the already implemented function perlin(x: number, y: number): number function to procedurally generate a 2D world of dimension width * height. This function returns a float between 0 and 1.

// The coordinates passed to the perlin function must be offset from startX and startY and will be smoothed by multiplying by scale. x is considered to be the horizontal coordinate and y the vertical coordinate.

// x=0 is left and x=(width - 1) is right.
// y=0 is top and y=(height - 1) is bottom.

// Input
// startX: An integer used as an offset for the x axis.
// startY: An integer used as an offset for the y axis.
// width: An integer representing the length of the x axis. Always >= 0.
// height: An integer representing the length of the y axis. Always >= 0.
// scale: A float used to smooth the coordinates. Always >= 0.

import { perlin } from './preloaded';

const HEIGHTS = ['░', '▒', '▓', '█'];
const THRESHOLDS = [0.5, 0.65, 0.8, 0.9];

export function render(
  startX: number,
  startY: number,
  width: number,
  height: number,
  scale: number
): string {
  const rows: string[] = [];

  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      const value = perlin((startX + x) * scale, (startY + y) * scale);
      let char = '.';
      for (let i = THRESHOLDS.length - 1; i >= 0; i--) {
        if (value >= THRESHOLDS[i]) {
          char = HEIGHTS[i];
          break;
        }
      }
      row += char;
    }

    rows.push(row);
  }

  return rows.join('\n');
}
