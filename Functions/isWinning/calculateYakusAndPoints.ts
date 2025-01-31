import {setWinningHand} from '../../Store/gameReducer';
import {
  TstolenTiles,
  TTileObject,
  TWhoTheWinnerIs,
  WindTypes,
  YakuCheckFunction,
  YakuType,
} from '../../Types/types';
import calculatePoints from '../calculatePoints/calculatePoints';
import {countTilesByName} from '../isReadyForRiichii/countTilesByName';
import checkDorasAndUraDoras from './checkDorasAndUraDoras';
import {isChanta} from './Yaku/isChanta';
import {isChiitoitsu} from './Yaku/isChiitoitsu';
import {isChinitsu} from './Yaku/isChinitsu';
import {isChinroutou} from './Yaku/isChinroutou';
import {isChuurenPoutou} from './Yaku/isChuurenPoutou';
import {isDaisangen} from './Yaku/isDaisangen';
import {isDaisuushii} from './Yaku/isDaisuushii';
import {isHonitsu} from './Yaku/isHonitsu';
import {isHonrotou} from './Yaku/isHonrotou';
import {isIipeikou} from './Yaku/isIipeikou';
import {isIttsuu} from './Yaku/isIttsuu';
import {isJunchan} from './Yaku/isJunchan';
import {isKokushiMusou} from './Yaku/isKokushiMusou';
import {isPinfu} from './Yaku/isPinfu';
import {isRiichi} from './Yaku/isRiichi';
import {isRyanpeikou} from './Yaku/isRyanpeikou';
import {isRyuuiisou} from './Yaku/isRyuuiisou';
import {isSanankou} from './Yaku/isSanankou';
import {isSankantsu} from './Yaku/isSankantsu';
import {isSanshokuDoujun} from './Yaku/isSanshokuDoujun';
import {isSanshokuDoukou} from './Yaku/isSanshokuDoukou';
import {isShousangen} from './Yaku/isShousangen';
import {isShousuushii} from './Yaku/isShousuushii';
import {isSuuankou} from './Yaku/isSuuankou';
import {isSuukantsu} from './Yaku/isSuukantsu';
import {isTanyao} from './Yaku/isTanyao';
import {isToiToi} from './Yaku/isToiToi';
import {isTsuuiisou} from './Yaku/isTsuuiisou';
import {isYakuhai} from './Yaku/isYakuhai';

type calculateYakusAndPointsTypes = {
  winningAction: 'ron' | 'tsumo';
  winningTile: TTileObject[];
  winningHand: TTileObject[];
  winningMelds: TstolenTiles[];
  playerRiichiIndex: number | null;
  dispatch: any; //TODO typescript
  playerWind: WindTypes;
  winnerWind: WindTypes;
  dorasFromDeadWall: TTileObject[];
  uraDorasFromDeadWall: TTileObject[];
  whoTheWinnerIs: TWhoTheWinnerIs;
};
const yakuChecks: YakuCheckFunction[] = [
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
  isSuukantsu,
  isSankantsu,
  isSuuankou,
  isHonitsu,
  isChinitsu,
  isRyuuiisou,
  isChuurenPoutou,
  isKokushiMusou,
  isSanankou,
];
//isRiichi
//add RiichiIndex
export const calculateYakusAndPoints = ({
  winningAction,
  winningTile,
  winningHand,
  winningMelds,
  playerRiichiIndex,
  dispatch,
  playerWind,
  winnerWind,
  dorasFromDeadWall,
  uraDorasFromDeadWall,
  whoTheWinnerIs,
}: calculateYakusAndPointsTypes) => {
  const start = performance.now();
  let listOfYakusInHand: YakuType[] = [];
  let discard = winningTile;
  let hand = winningHand;
  let meldedTiles: TTileObject[];
  let handForCalculation = [];
  let totalHanRon = 0;
  let totalHanTsumo = 0;
  let totalHan: number = 0;
  //let processAction: 'ron' | 'tsumo' = winningAction.toLowerCase();
  //check all the yaku possibilities on hand
  for (const check of yakuChecks) {
    const result = check({
      hand,
      discard,
      playerMelds: winningMelds,
      Process: winningAction,
    });
    if (typeof result === 'object' && result.result) {
      if (result.typeOfAction === 'RON') {
        totalHanRon += result.han || 0;
        listOfYakusInHand.push({han: result.han, yakuName: result.yakuName});
      } else if (result.typeOfAction === 'TSUMO') {
        totalHanTsumo += result.han || 0;
        listOfYakusInHand.push({han: result.han, yakuName: result.yakuName});
      }
    }
  }
  //Riichi calculation logic
  if (playerRiichiIndex !== null) {
    const result = isRiichi({
      hand,
      discard,
      playerMelds: winningMelds,
      Process: winningAction,
    });
    if (result.typeOfAction === 'RON') {
      totalHanRon += result.han || 0;
      listOfYakusInHand.push({han: result.han, yakuName: result.yakuName});
    } else if (result.typeOfAction === 'TSUMO') {
      totalHanTsumo += result.han || 0;
      listOfYakusInHand.push({han: result.han, yakuName: result.yakuName});
    }
  }

  //if there are Kans, just limit amount of them to 3 tiles
  meldedTiles = winningMelds.flatMap(meld => meld.tiles);
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
  //this will be in WinningHandComponent.tsx
  let handReadyForRender = [...winningHand, ...limitedMeldedTiles];
  totalHan = totalHanRon === 0 ? totalHanTsumo : totalHanRon;
  let typeOfWin: 'TSUMO' | 'RON' = totalHanRon === 0 ? 'TSUMO' : 'RON';
  let isRichiiActive = playerRiichiIndex !== null;
  //calculating doras doras!!!!
  //this does not work!!!
  let {doraHan, doraName, uraDoraHan, uraDoraName} = checkDorasAndUraDoras(
    hand,
    winningMelds,
    discard,
    isRichiiActive,
    dorasFromDeadWall,
    uraDorasFromDeadWall,
  );
  console.log(
    'CALCULATE YAKUS: DORAS',
    '   DoraHan:',
    doraHan,
    doraName,
    '   UraDoraHan:',
    uraDoraHan,
    uraDoraName,
  );

  totalHan = totalHan + doraHan;
  totalHan = totalHan + uraDoraHan;
  //listOfYakusInHand.push(doraName) TODO correct typescript
  if (doraName != '') {
    listOfYakusInHand.push({han: doraHan, yakuName: doraName});
    console.log('Counting Doras:', doraHan, doraName);
  }
  if (uraDoraName != '') {
    listOfYakusInHand.push({han: uraDoraHan, yakuName: uraDoraName});
    console.log('Counting UraDoras:', uraDoraHan, uraDoraName);
  }
  //winnerWind: player1.wind, because now only player1 can press ron or tsumo
  let {points, pointsName, fu} = calculatePoints(
    totalHan,
    playerWind,
    hand,
    winningMelds,
    winnerWind,
    discard,
    typeOfWin,
    dispatch,
    whoTheWinnerIs,
  );

  const end = performance.now();
  console.info(
    `calculateYakusAndPoints() took  ${((end - start) / 1000).toFixed(
      3,
    )} seconds`,
  );
  //set redux gameReducer . but where to reset it? ;/
  dispatch(
    setWinningHand({
      hand: winningHand,
      tile: winningTile,
      yaku: listOfYakusInHand,
      winAction: typeOfWin,
      points: points,
      pointsName: pointsName,
      fu: fu,
      totalHan: totalHan,
      //type: 'update',
      isRichiiActive: isRichiiActive,
    }),
  );
  //return {totalHan, listOfYakusInHand};
};
