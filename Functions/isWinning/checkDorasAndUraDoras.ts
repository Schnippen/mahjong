import {TTileObject, TstolenTiles} from '../../Types/types';
interface DoraResult {
  doraHan: number;
  doraName: string;
  uraDoraHan: number;
  uraDoraName: string;
}
const checkDorasAndUraDoras = (
  hand: TTileObject[],
  currentMelds: TstolenTiles[],
  discard: TTileObject[],
  isRichiiActive: boolean,
  dorasFromDeadWall: TTileObject[],
  uraDorasFromDeadWall: TTileObject[],
): DoraResult => {
  let meldedTiles = currentMelds.flatMap(meld => meld.tiles || []);
  let handToCheck = [...hand, ...discard, ...meldedTiles];

  let activeDoras = dorasFromDeadWall.filter(n => n.isDora).length;
  // let doras = dorasFromDeadWall || [];
  let doras = activeDoras > 0 ? dorasFromDeadWall.slice(0, activeDoras) : [];
  //TODO check if this works
  let uradoras =
    activeDoras > 0 ? uraDorasFromDeadWall.slice(0, activeDoras) : [];

  console.log(
    'checkDorasAndUraDoras():',
    'doras:',
    doras.map((n, i) => ({
      name: n?.name,
      isDora: n?.isDora,
    })),
    'uraDoras:',
    uradoras.map((n, i) => ({
      name: n?.name,
      isDora: n?.isDora,
    })),
    'handToCheck:',
    handToCheck?.map(n => n?.name),
  );
  const getCorrectedTileName = (tile: TTileObject) => {
    if (!tile) return '';

    let {name, type} = tile;
    if (!name) return '';

    let match = name.match(/(\D+)(\d+)/);

    if (match) {
      let tileType = match[1];
      let tileNumber = parseInt(match[2], 10);

      if (['characters', 'bamboo', 'circles'].includes(tileType)) {
        tileNumber = (tileNumber % 9) + 1;
        return `${tileType}${tileNumber}`;
      } else if (['east', 'south', 'west', 'north'].includes(tileType)) {
        const windOrder = ['east', 'south', 'west', 'north'];
        let nextWindIndex =
          (windOrder.indexOf(tileType) + 1) % windOrder.length;
        return windOrder[nextWindIndex];
      } else if (['white', 'green', 'red'].includes(tileType)) {
        const dragonOrder = ['white', 'green', 'red'];
        let nextDragonIndex =
          (dragonOrder.indexOf(tileType) + 1) % dragonOrder.length;
        return dragonOrder[nextDragonIndex];
      }
    }
    return name;
  };

  const dorasWithNumberCorrection = doras.map(getCorrectedTileName);
  const uraDorasWithNumberCorrection = uradoras.map(getCorrectedTileName);
  console.log(
    'dorasWithNumberCorrection',
    dorasWithNumberCorrection?.map(n => n),
    'uraDorasWithNumberCorrection:',
    uraDorasWithNumberCorrection?.map(i => i),
  );
  let doraHan = 0;
  let uraDoraHan = 0;
  let doraName = '';
  let uraDoraName = '';

  handToCheck.forEach(tile => {
    if (tile) {
      let tileName = tile.name;

      if (dorasWithNumberCorrection.includes(tileName)) {
        doraName = 'Dora';
        doraHan++;
      }
    }
  });

  if (isRichiiActive && uraDorasWithNumberCorrection.length > 0) {
    uraDoraName = 'UraDora';
    handToCheck.forEach(tile => {
      if (tile) {
        let tileName = tile.name;

        if (uraDorasWithNumberCorrection.includes(tileName)) {
          uraDoraHan++;
        }
      }
    });
  }
  console.log('COUNTING DORAS:', doraHan, doraName, uraDoraHan, uraDoraName);
  return {
    doraHan,
    doraName: doraHan > 0 ? doraName : '',
    uraDoraHan,
    uraDoraName: uraDoraHan > 0 ? uraDoraName : '',
  };
};

export default checkDorasAndUraDoras;
