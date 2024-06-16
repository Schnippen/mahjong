import { tileCountsType } from "../../../Types/types";

export function checkDaisuushii(tileCounts: tileCountsType): boolean {
  const windTiles = ['east', 'south', 'west', 'north'];

  let tripletsOrQuadsCount = 0;
  let east = 0;
  let south = 0;
  let west = 0;
  let north = 0;

  for (let tileName in tileCounts) {
    const [type] = tileName.split(/(\d+)/).filter(Boolean);
    if (windTiles.includes(type)) {
      if (type === "east") east += tileCounts[tileName];
      if (type === "south") south += tileCounts[tileName];
      if (type === "west") west += tileCounts[tileName];
      if (type === "north") north += tileCounts[tileName];
    }
  }

  if (east >= 3) {
    tripletsOrQuadsCount++;
  }
  if (south >= 3) {
    tripletsOrQuadsCount++;
  }
  if (west >= 3) {
    tripletsOrQuadsCount++;
  }
  if (north >= 3) {
    tripletsOrQuadsCount++;
  }

  //console.log("tileCounts:", tileCounts, "tripletsOrQuadsCount:", tripletsOrQuadsCount, "east:", east, "south:", south, "west:", west, "north:", north);
  
  return tripletsOrQuadsCount === 4;
}