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
  let doraName = '';
  handToCheck.forEach(element => {
    if (doras.includes(element)) {
      doraHan++;
    }
  });

  if (isRichiiActive) {
    handToCheck.forEach(tile => {
      if (uradoras.includes(tile)) {
        uraDoraHan++;
      }
    });
  }
  //1 each dora is 1 han
  //dora
  //dora ni
  //dora san
  //...
  return {doraHan, doraName, uraDoraHan};
};

export default checkDorasAndUraDoras;
