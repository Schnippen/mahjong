import {
    TTileObject,
    TstolenTiles,
    TypeOfAction,
  } from '../../../Types/types';
import { checkMelds } from '../../isReadyForRiichii/checkMelds';
  import { countTilesByName } from '../../isReadyForRiichii/countTilesByName';
import { checkIipeikou } from '../UtilsFunctions/checkIipeikou';


  
  type isIipekouTypes = {
    hand: TTileObject[];
    discard: TTileObject[];
    playerMelds: TstolenTiles[];
  };
  
  export function isIipeikou({ hand, discard, playerMelds }: isIipekouTypes) {
    const start = performance.now();
    let handToCheck: TTileObject[] = [];
    let typeOfAction: TypeOfAction = '';
  
    let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
    if(meldedTiles.length>0){
        typeOfAction = '';
        return { result: false, typeOfAction: typeOfAction };
    }
    if (hand.length === 14) {
      handToCheck = hand;
      typeOfAction = 'TSUMO';
    } else {
      handToCheck = [...hand, ...discard]; //is closed only
      typeOfAction = 'RON';
    }
   
    const tileCounts = countTilesByName(handToCheck);
    
/*     for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        const newCounts = { ...tileCounts };
        newCounts[tileName] -= 2;
        if (checkIipeikou(newCounts)) {
          return true;
        }
      }
    } */
// threre might be bug  
 if (checkIipeikou(tileCounts)) {
  for (let tileName in tileCounts) {
    if (tileCounts[tileName] >= 2) {
      const newCounts = { ...tileCounts };
      newCounts[tileName] -= 2;
      if (checkMelds(newCounts) === 4) {
        return { result: true, typeOfAction: typeOfAction };
      }
    }
  }
} 
//must check for 4 triplets and a pair
/*     if (checkIipekou(tileCounts)) {
      return { result: true, typeOfAction: typeOfAction };
    } */
  
    const end = performance.now();
    console.log(`isIipekou() took ${end - start} milliseconds.`);
    return { result: false, typeOfAction: typeOfAction };
  }
  