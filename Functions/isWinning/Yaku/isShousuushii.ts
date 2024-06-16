import { TTileObject, TstolenTiles, TypeOfAction } from "../../../Types/types";
import { checkMelds } from "../../isReadyForRiichii/checkMelds";
import { countTilesByName } from "../../isReadyForRiichii/countTilesByName";
import { checkShousuushii } from "../UtilsFunctions/checkShousuushii";

type isShousuushiiTypes = {
    hand: TTileObject[];
    discard: TTileObject[];
    playerMelds: TstolenTiles[];
  };
  
  export function isShousuushii({ hand, discard, playerMelds }: isShousuushiiTypes) {
    const start = performance.now();
    let handToCheck: TTileObject[] = [];
    let typeOfAction: TypeOfAction = '';
  
    let meldedTiles = playerMelds.flatMap(meld => meld.tiles);
    if (hand.length === 14) {
      handToCheck = hand;
      typeOfAction = 'TSUMO';
    } else {
      handToCheck = [...hand, ...discard, ...meldedTiles];
      typeOfAction = 'RON';
    }
  
    const tileCounts = countTilesByName(handToCheck);

    if (checkShousuushii(tileCounts)) {
      //return { result: true, typeOfAction: typeOfAction }; //there is problem with melds
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

    const end = performance.now();
    console.log(`isShousuushii() took ${end - start} milliseconds.`);
    return { result: false, typeOfAction: typeOfAction };
  }