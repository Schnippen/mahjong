import {tileCountsType} from '../../../Types/types';

export function checkHonroutou(tileCounts: tileCountsType): boolean {
  const terminalsAndHonors = [
    '1',
    '9',
    'east',
    'south',
    'west',
    'north',
    'red',
    'green',
    'white',
  ];
  const validTypes = ['bamboo', 'circles', 'characters'];
  let meldsFound = 0;
  let pairFound = false;
  let remainingTileCounts = {...tileCounts};

  //console.log('insideHonroutou:', tileCounts);

  const isTerminalOrHonor = (type: string, value: string) => {
    return (
      terminalsAndHonors.includes(value) || terminalsAndHonors.includes(type)
    );
  };

  for (let tileName in remainingTileCounts) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);

    if (!validTypes.includes(type) && !terminalsAndHonors.includes(type))
      continue;

    if (!isTerminalOrHonor(type, value)) return false;

    while (remainingTileCounts[tileName] >= 3) {
      remainingTileCounts[tileName] -= 3;
      meldsFound++;
    }
  }
  for (let tileName in remainingTileCounts) {
    if (remainingTileCounts[tileName] === 2) {
      const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
      if (isTerminalOrHonor(type, value)) {
        pairFound = true;
        remainingTileCounts[tileName] -= 2;
        break;
      }
    }
  }
  console.log('melds Honroutou:', meldsFound);
  return meldsFound === 4 && pairFound;
}
