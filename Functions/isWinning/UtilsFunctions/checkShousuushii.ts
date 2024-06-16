import { tileCountsType } from "../../../Types/types";

export function checkShousuushii(tileCounts: tileCountsType): boolean {
    const windTiles = ['east', 'south', 'west', 'north'];
  
    let tripletsOrQuadsCount = 0;
    let pairCount = 0;
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
    } else if (east === 2) {
      pairCount++;
    }
    if (south >= 3) {
      tripletsOrQuadsCount++;
    } else if (south === 2) {
      pairCount++;
    }
    if (west >= 3) {
      tripletsOrQuadsCount++;
    } else if (west === 2) {
      pairCount++;
    }
    if (north >= 3) {
      tripletsOrQuadsCount++;
    } else if (north === 2) {
      pairCount++;
    }
  
    //console.log("tileCounts:", tileCounts, "tripletsOrQuadsCount:", tripletsOrQuadsCount, "pairCount:", pairCount, "east:", east, "south:", south, "west:", west, "north:", north);
    
    return tripletsOrQuadsCount === 3 && pairCount === 1;
  }
  