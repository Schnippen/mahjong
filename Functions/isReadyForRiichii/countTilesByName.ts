import { TTileObject, tileCountsType } from "../../Types/types";

export  function countTilesByName(hand:TTileObject[]) {
    const tileCounts: tileCountsType = {};
    hand.forEach(tile => {
      const tileName = tile.name;
      if (tileCounts[tileName]) {
        tileCounts[tileName]++;
      } else {
        tileCounts[tileName] = 1;
      }
    });
    return tileCounts;
  }