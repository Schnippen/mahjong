import store from '../../Store/store';
import {TTileObject, TstolenTiles} from '../../Types/types';

const checkDorasAndUraDoras = (
  hand: TTileObject[],
  currentMelds: TstolenTiles[],
  discard: TTileObject[],
  isRichiiActive: boolean,
) => {
  let meldedTiles = currentMelds.flatMap(meld => meld.tiles || []);
  let handToCheck = [...hand, ...discard, ...meldedTiles];

  let doras = store.getState().wallReducer.dorasFromDeadWall || [];
  let uradoras = store.getState().wallReducer.uraDorasFromDeadWall || [];

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

  let doraHan = 0;
  let uraDoraHan = 0;
  let doraName = '';
  let uraDoraName = '';

  handToCheck.forEach(tile => {
    if (tile && tile.isDora) {
      let correctedDoraName = ['characters', 'bamboo', 'circles'].includes(
        tile.type,
      )
        ? tile.name
        : tile.value;

      if (dorasWithNumberCorrection.find(tile => tile === correctedDoraName)) {
        doraName = 'Dora';
        doraHan++;
      }
    }
  });

  if (isRichiiActive && uraDorasWithNumberCorrection.length > 0) {
    uraDoraName = 'UraDora';
    handToCheck.forEach(tile => {
      if (tile && tile.isDora) {
        let correctedDoraName = ['characters', 'bamboo', 'circles'].includes(
          tile.type,
        )
          ? tile.name
          : tile.value;

        if (
          uraDorasWithNumberCorrection.find(tile => tile === correctedDoraName)
        ) {
          uraDoraHan++;
        }
      }
    });
  }
  console.log('COUNTING DORAS:', doraHan, doraName, uraDoraHan, uraDoraName);
  return {doraHan, doraName, uraDoraHan, uraDoraName};
};

export default checkDorasAndUraDoras;
