import { tileCountsType } from "../../../Types/types";

export function checkDaisangen(tileCounts: tileCountsType): boolean {
  const dragonTiles = ['red', 'white', 'green'];

  let tripletsOrQuadsCount = 0;
  let green = 0;
  let red = 0;
  let white = 0;


  for (let tileName in tileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);
    if (dragonTiles.includes(type)) {
      if (type === "white") white += tileCounts[tileName];
      if (type === "red") red += tileCounts[tileName];
      if (type === "green") green += tileCounts[tileName];
    }
  }


  if (green >= 3) {
    tripletsOrQuadsCount++;
  }
  if (red >= 3) {
    tripletsOrQuadsCount++;
  }
  if (white >= 3) {
    tripletsOrQuadsCount++;
  }

 // console.log("tileCounts:", tileCounts, "tripletsOrQuadsCount:", tripletsOrQuadsCount, "green:", green, "red:", red, "white:", white);
  
  return tripletsOrQuadsCount === 3;
}