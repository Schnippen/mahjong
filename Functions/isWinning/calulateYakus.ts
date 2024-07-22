import { setWinningHand } from "../../Store/gameReducer";
import { TTileObject, TstolenTiles, WindTypes, YakuType } from "../../Types/types";
import calculateRonPoints from "../calculatePoints/calculateRonPoints";
import calculateTsumoPoints from "../calculatePoints/calculateTsumoPoints";
import { countTilesByName } from "../isReadyForRiichii/countTilesByName";
import { isChanta } from "./Yaku/isChanta";
import { isChiitoitsu } from "./Yaku/isChiitoitsu";
import { isChinitsu } from "./Yaku/isChinitsu";
import { isChinroutou } from "./Yaku/isChinroutou";
import { isChuurenPoutou } from "./Yaku/isChuurenPoutou";
import { isDaisangen } from "./Yaku/isDaisangen";
import { isDaisuushii } from "./Yaku/isDaisuushii";
import { isHonitsu } from "./Yaku/isHonitsu";
import { isHonrotou } from "./Yaku/isHonrotou";
import { isIipeikou } from "./Yaku/isIipeikou";
import { isIttsuu } from "./Yaku/isIttsuu";
import { isJunchan } from "./Yaku/isJunchan";
import { isKokushiMusou } from "./Yaku/isKokushiMusou";
import { isPinfu } from "./Yaku/isPinfu";
import { isRyanpeikou } from "./Yaku/isRyanpeikou";
import { isRyuuiisou } from "./Yaku/isRyuuiisou";
import { isSanshokuDoujun } from "./Yaku/isSanshokuDoujun";
import { isSanshokuDoukou } from "./Yaku/isSanshokuDoukou";
import { isShousangen } from "./Yaku/isShousangen";
import { isShousuushii } from "./Yaku/isShousuushii";
import { isTanyao } from "./Yaku/isTanyao";
import { isToiToi } from "./Yaku/isToiToi";
import { isTsuuiisou } from "./Yaku/isTsuuiisou";
import { isYakuhai } from "./Yaku/isYakuhai";

 const yakuChecks = [
    isPinfu,
    isIipeikou,
    isIttsuu,
    isRyanpeikou,
    isSanshokuDoujun,
    isTanyao,
    isYakuhai,
    isShousangen,
    isDaisangen,
    isShousuushii,
    isDaisuushii,
    isChanta,
    isJunchan,
    isHonrotou,
    isChinroutou,
    isTsuuiisou,
    isChiitoitsu,
    isToiToi,
    isSanshokuDoukou,
    isHonitsu,
    isChinitsu,
    isRyuuiisou,
    isChuurenPoutou,
    isKokushiMusou,
  ];


  export const checkYakusInHand = (
    hand: TTileObject[], discard: TTileObject[], currentMelds: TstolenTiles[], dispatch: any,winnerWind:WindTypes
  ): { totalHan: number; listOfYakusInHand: YakuType[] } => {
    let totalHanRon = 0;
    let totalHanTsumo = 0;
    let listOfYakusInHand: YakuType[] = [];
    let winningHand: TTileObject[] = [];
    let winningTile: TTileObject[] = [];
    let winningAction = '';
    let totalHan: number = 0;
  
    for (const check of yakuChecks) {
      const result = check({ hand, discard, playerMelds: currentMelds });
      if (typeof result === 'object' && result.result) {
        if (result.typeOfAction === 'RON') {
          totalHanRon += result.han || 0;
          listOfYakusInHand.push({ han: result.han, yakuName: result.yakuName });
        } else if (result.typeOfAction === 'TSUMO') {
          totalHanTsumo += result.han || 0;
          listOfYakusInHand.push({ han: result.han, yakuName: result.yakuName });
        }
      }
    }

    const meldedTiles = currentMelds.flatMap(meld => meld.tiles);
    const tileCounts = countTilesByName(meldedTiles);
    let limitedMeldedTiles: TTileObject[] = [];
  
    for (let tileName in tileCounts) {
      const count = Math.min(tileCounts[tileName], 3);
      for (let i = 0; i < count; i++) {
        const tile = meldedTiles.find(t => t.name === tileName);
        if (tile) {
          limitedMeldedTiles.push(tile);
        }
      }
    }
  
    winningHand = [...hand, ...limitedMeldedTiles];
    
    totalHan = totalHanRon === 0 ? totalHanTsumo : totalHanRon;
    let typeOfWin = totalHanRon === 0 ? "tsumo" : 'ron'; //add  to setwinning hand
    if (typeOfWin === "tsumo") {
      calculateTsumoPoints(totalHan, winnerWind, hand, currentMelds, winnerWind,discard);
    } else {
      //calculateRonPoints(totalHan, winnerWind);
    }
    //calculateRonPoints(totalHan,winnersWind)
    //calculate points
    dispatch(setWinningHand({ hand: winningHand, tile: winningTile, yaku: listOfYakusInHand, winAction: winningAction, type: 'update' }));
    return { totalHan, listOfYakusInHand };
  };