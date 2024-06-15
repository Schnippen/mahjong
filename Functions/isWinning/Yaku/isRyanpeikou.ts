import {
    TTileObject,
    TstolenTiles,
    TypeOfAction,
    tileCountsType,
  } from '../../../Types/types';
import { checkMelds } from '../../isReadyForRiichii/checkMelds';
  import { countTilesByName } from '../../isReadyForRiichii/countTilesByName';
  import { checkRyanpeikou } from '../UtilsFunctions/checkRyanpeikou';
  
  type isRyanpeikouTypes = {
    hand: TTileObject[];
    discard: TTileObject[];
    playerMelds: TstolenTiles[];
  };
  
  export function isRyanpeikou({ hand, discard, playerMelds }: isRyanpeikouTypes) {
    const start = performance.now();
    let handToCheck: TTileObject[] = [];
    let typeOfAction: TypeOfAction = '';
  
    let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
    //closed only
    if(meldedTiles.length>0){ 
      typeOfAction = '';
      return { result: false, typeOfAction: typeOfAction };
  }
    if (hand.length === 14) {
      handToCheck = hand;
      typeOfAction = 'TSUMO';
    } else {
      handToCheck = [...hand, ...discard, ...meldedTiles];
      typeOfAction = 'RON';
    }
  
    const tileCounts = countTilesByName(handToCheck);

    if (checkRyanpeikou(tileCounts)) {
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
/*     for (let tileName in tileCounts) {
      if (tileCounts[tileName] >= 2) {
        console.log(tileCounts)
        const newCounts = { ...tileCounts };
        newCounts[tileName] -= 2;
        //console.log("RYAN",checkRyanpeikou(newCounts))
        if (checkRyanpeikou(newCounts)) {
          
           return { result: true, typeOfAction: typeOfAction };
        }
        }
      }  */
  
    const end = performance.now();
    console.log(`isRyanpeikou() took ${end - start} milliseconds.`);
    return { result: false, typeOfAction: typeOfAction };
  }
  