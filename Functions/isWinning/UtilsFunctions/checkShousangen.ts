import {tileCountsType} from '../../../Types/types';

export function checkShousangen(tileCounts: tileCountsType): boolean {
  const dragonTiles = ['red', 'white', 'green'];

  let tripletsOrQuadsCount = 0;
  let pairCount = 0;
  let green = 0;
  let red = 0;
  let white = 0;

  // Count the number of each dragon tile
  for (let tileName in tileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);
    if (dragonTiles.includes(type)) {
      if (type === 'white') white += tileCounts[tileName];
      if (type === 'red') red += tileCounts[tileName];
      if (type === 'green') green += tileCounts[tileName];
    }
  }

  if (green >= 3) {
    tripletsOrQuadsCount++;
  } else if (green === 2) {
    pairCount++;
  }
  if (red >= 3) {
    tripletsOrQuadsCount++;
  } else if (red === 2) {
    pairCount++;
  }
  if (white >= 3) {
    tripletsOrQuadsCount++;
  } else if (white === 2) {
    pairCount++;
  }

  /*   console.log("tileCounts:", tileCounts, "tripletsOrQuadsCount:", tripletsOrQuadsCount, "pairCount:", pairCount, "green:", green, "red:", red, "white:", white); */

  return tripletsOrQuadsCount === 2 && pairCount === 1;
}
