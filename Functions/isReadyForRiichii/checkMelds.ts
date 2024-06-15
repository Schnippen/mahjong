import { tileCountsType } from "../../Types/types";

/* export function checkMelds(tileCounts:tileCountsType) {
    let meldsFound = 0;
    for (let tileName in tileCounts) {
      while (tileCounts[tileName] >= 3) {
        tileCounts[tileName] -= 3;
        meldsFound++;
      }
      //checking for 1-9
      if (tileCounts[tileName] > 0) {
        const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
        if (type && value) {
          const nextValue1 = `${type}${parseInt(value) + 1}`;
          const nextValue2 = `${type}${parseInt(value) + 2}`;
          if (tileCounts[nextValue1] > 0 && tileCounts[nextValue2] > 0) {
            tileCounts[tileName]--;
            tileCounts[nextValue1]--;
            tileCounts[nextValue2]--;
            meldsFound++;
          }
        }
      }
    }
    console.log("melds:",meldsFound)
    return meldsFound;
  } */

//!honorAndWindTiles.includes(type)
    export function checkMelds(tileCounts: tileCountsType): number {
      let honorAndWindTiles=["red","white","green","east","south","west","north"]
      let meldsFound = 0;
    

      for (let tileName in tileCounts) {
        //console.log("tileNme",tileName)
        
        while (tileCounts[tileName] >= 3) {
          tileCounts[tileName] -= 3;
          meldsFound++;
        }
  
        // Checking for sequences
        let continueCheck = true;
        while (tileCounts[tileName] > 0 && continueCheck) {
          const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
          if (type && value) {
            const nextValue1 = `${type}${parseInt(value) + 1}`;
            const nextValue2 = `${type}${parseInt(value) + 2}`;
    
            if (
              tileCounts[nextValue1] > 0 &&
              tileCounts[nextValue2] > 0
            ) {
              tileCounts[tileName]--;
              tileCounts[nextValue1]--;
              tileCounts[nextValue2]--;
              meldsFound++;
            } else {
              continueCheck = false; 
            }
          }
        }
      }
      console.log("melds:",meldsFound)

      return meldsFound;
    }
/* 
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = { ...tileCounts };
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
        return true;
      }
    }
  } */