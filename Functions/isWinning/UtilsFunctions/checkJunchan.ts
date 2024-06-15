import { tileCountsType } from "../../../Types/types";

export function checkJunchanMelds(tileCounts: tileCountsType): boolean {
    let meldsFound = 0;
    let validTypes = ['bamboo', 'circles', 'characters'];
    console.log("insideJunchan:",tileCounts)
    for (let tileName in tileCounts) {
      const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
  
      // Skip invalid types and non-terminal values
      if (validTypes.indexOf(type) === -1) continue;
      if (value !== '1' && value !== '9' && value !== '7' && value !== '8' && value !== '2' && value !== '3') continue;
  
      // Form melds with triplets of 1 or 9
      while (tileCounts[tileName] >= 3) {
        tileCounts[tileName] -= 3;
        meldsFound++;
      }
  
      // Form sequences from 1-2-3 and 7-8-9
      if (tileCounts[tileName] > 0 && (value === '1' || value === '7')) {
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
    //console.log("inside meldsFound:",meldsFound)
    // Ensure all melds include terminal tiles
    for (let tileName in tileCounts) {
      const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
      if (tileCounts[tileName] > 0 && value !== '1' && value !== '9') {
        return false; // Invalid meld found
      }
    }
    
    return meldsFound === 4;
  }