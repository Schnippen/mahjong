import store from '../../Store/store';
import {TTileObject, TstolenTiles} from '../../Types/types';

const checkDorasAndUraDoras = (
  hand: TTileObject[],
  currentMelds: TstolenTiles[],
  discard: TTileObject[],
  isRichiiActive: boolean,
) => {
  //hand as parameter

  let meldedTiles = currentMelds.flatMap(meld => meld.tiles);
  let handToCheck = [...hand, ...discard, ...meldedTiles];

  let doras = store.getState().wallReducer.dorasFromDeadWall;
  let uradoras = store.getState().wallReducer.uraDorasFromDeadWall; //if they are any after won riichi
  let doraHan: number = 0;
  let uraDoraHan: number = 0;
  let doraName = 'Dora';
  let uraDoraName = '';
  handToCheck.forEach(doraTile => {
    if (doraTile.isDora && doras.includes(doraTile)) {
      doraHan++;
    }
  });

  if (isRichiiActive) {
    handToCheck.forEach(tile => {
      if (tile.isDora && uradoras.includes(tile)) {
        uraDoraHan++;
      }
    });
    uraDoraName = 'UraDora';
  }
  //1 each dora is 1 han
  //dora
  //dora ni
  //dora san
  //...
  return {doraHan, doraName, uraDoraHan, uraDoraName};
};

export default checkDorasAndUraDoras;
