import store from "../../Store/store";
import { GameWinds, TstolenTiles, TTileObject, WindTypes } from "../../Types/types";
import { calculateFu } from "./calculateFu";

const calculateRonPoints=(totalHan: number, playersWind: WindTypes, hand: TTileObject[], currentMelds: TstolenTiles[], winnerWind: WindTypes,discard:TTileObject[],typeOfWin: 'tsumo' | 'ron'): number => {

  let prevailingWind:WindTypes = store.getState().gameReducer.prevailingWind;

  let fu = calculateFu(hand, currentMelds, typeOfWin, discard,playersWind,prevailingWind);
  
  let points = 0;

  if (winnerWind === "east") {
    // East player wins, different points calculation
    points = fu * (2 ** (totalHan + 2));
  } else {
    // Other player wins
    points = fu * (2 ** (totalHan + 1));
  }

  // Additional points calculation logic based on han
  if (totalHan >= 13) {
    return 8000; // Yakuman
  } else if (totalHan >= 11) {
    return 6000; // Sanbaiman
  } else if (totalHan >= 8) {
    return 4000; // Baiman
  } else if (totalHan >= 6) {
    return 3000; // Haneman
  } else if (totalHan >= 5 || (totalHan >= 4 && fu >= 40) || (totalHan >= 3 && fu >= 70)) {
    return 2000; // Mangan
  }

  return points;
}
export default calculateRonPoints