import store from "../../Store/store";
import { GameWinds, TTileObject, WindTypes } from "../../Types/types";
import { calculateFu } from "./calculateFu";

const calculateRonPoints=(totalHan: number, playersWind: string,  playersHand:TTileObject[],winnersWind:WindTypes): number=> {
  let prevailingWind = store.getState().gameReducer.prevailingWind
  calculateFu(typeOfWin,)
  if(winnersWind==="east"){
    //do math
  }else{
    //do other math
  }
  switch (totalHan) {
    case 1:
      return 1500;
    case 2:
      return 3000;
    default:
      return 0;
  }
}
export default calculateRonPoints