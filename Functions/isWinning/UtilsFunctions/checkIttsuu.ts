import { tileCountsType } from '../../../Types/types';

export function checkIttsuu(tileCounts: tileCountsType): boolean {
  const validTypes = ['bamboo', 'circles', 'characters'];

  for (let type of validTypes) {
    let completeSequence = true;
    for (let value = 1; value <= 9; value++) {
      const tileName = `${type}${value}`;
      if (!tileCounts[tileName] || tileCounts[tileName] === 0) {
        completeSequence = false;
        break;
      }
    }
    if (completeSequence) {
      return true;
    }
  }

  return false;
}

/* ALTERNATIVE
export function checkIttsuu(tileCounts: tileCountsType): boolean {
    const validTypes = ['bamboo', 'circles', 'characters'];
  
    for (let type of validTypes) {
      const requiredSequence = Array.from({ length: 9 }, (_, i) => `${type}${i + 1}`);
  
      if (requiredSequence.every(tile => tileCounts[tile] && tileCounts[tile] > 0)) {
        return true;
      }
    }
  
    return false;
  } */