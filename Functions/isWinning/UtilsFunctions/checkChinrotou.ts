import {tileCountsType} from '../../../Types/types';

export function checkChinroutou(tileCounts: tileCountsType): boolean {
  const terminals = ['1', '9'];
  const validTypes = ['bamboo', 'circles', 'characters'];
  let meldsFound = 0;
  let pairFound = false;
  let remainingTileCounts = {...tileCounts};

  console.log('insideChinroutou:', tileCounts);
  const isTerminal = (type: string, value: string) => {
    return terminals.includes(value) && validTypes.includes(type);
  };
  for (let tileName in remainingTileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    if (!validTypes.includes(type)) continue;
    if (!isTerminal(type, value)) return false;
    while (remainingTileCounts[tileName] >= 3) {
      remainingTileCounts[tileName] -= 3;
      meldsFound++;
    }
  }
  for (let tileName in remainingTileCounts) {
    if (remainingTileCounts[tileName] === 2) {
      const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
      if (isTerminal(type, value)) {
        pairFound = true;
        remainingTileCounts[tileName] -= 2;
        break;
      }
    }
  }
  console.log('melds Chinroutou:', meldsFound);
  return meldsFound === 4 && pairFound;
}
