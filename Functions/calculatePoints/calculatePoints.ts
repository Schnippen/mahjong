import {calculateScore, HONBA_REDUCER} from '../../Store/playersReducer';
import store from '../../Store/store';
import {
  pointsNameType,
  TstolenTiles,
  TTileObject,
  TWhoTheWinnerIs,
  WindTypes,
} from '../../Types/types';
import {calculateFu} from './calculateFu';

const calculatePoints = (
  totalHan: number,
  playersWind: WindTypes,
  hand: TTileObject[],
  currentMelds: TstolenTiles[],
  winnerWind: WindTypes,
  discard: TTileObject[],
  typeOfWin: 'TSUMO' | 'RON',
  dispatch: any,
  whoTheWinnerIs: TWhoTheWinnerIs,
): {points: number; pointsName: pointsNameType; fu: number} => {
  const {
    prevailingWind,
    honba,
    playerName: whoWon,
    whoTheLoserIs: whoLost,
  } = whoTheWinnerIs;

  const playerWhoLostToRon = whoLost[0]?.loserName;
  const playerWhoLostToTsumo = whoLost.map(p => p?.loserName);

  const fu = calculateFu(
    hand,
    currentMelds,
    typeOfWin,
    discard,
    playersWind,
    prevailingWind,
  );

  let basePoints = 0;
  let pointsName: pointsNameType = '';
  const isDealer = winnerWind === 'east';

  //https://riichi.wiki/Scoring_table
  if (totalHan >= 13) {
    pointsName = 'Yakuman';
    basePoints = isDealer ? 48000 : 32000;
  } else if (totalHan >= 11) {
    pointsName = 'Sanbaiman';
    basePoints = isDealer ? 36000 : 24000;
  } else if (totalHan >= 8) {
    pointsName = 'Baiman';
    basePoints = isDealer ? 24000 : 16000;
  } else if (totalHan >= 6) {
    pointsName = 'Haneman';
    basePoints = isDealer ? 18000 : 12000;
  } else if (totalHan >= 5) {
    pointsName = 'Mangan';
    basePoints = isDealer ? 12000 : 8000;
  } else {
    // Calculate non-limit hand
    basePoints = Math.min(fu * Math.pow(2, totalHan + 2), 2000);
    if (basePoints >= 2000) {
      pointsName = 'Mangan';
      basePoints = isDealer ? 12000 : 8000;
    }
  }
  //points += honba * 100;

  /*  Do sumy dodaje się wartość honba na stole (znaczniki powtórzenia rozdania) Gracz zronowany płaci 300 puntów dodatkowych za każdą honbę W przypadku tsumo każdy gracz płaci 100 punktów za każdą honbę 

   All nondealer players pay the smaller amount, while the dealer pays the larger amount.  https://riichi.wiki/Scoring_table */
  let finalPoints = basePoints;

  if (typeOfWin === 'TSUMO') {
    if (winnerWind === 'east') {
      finalPoints = basePoints + honba * 100;
      dispatch(HONBA_REDUCER({TypeOfAction: 'increment'}));
    } else {
      finalPoints = Math.ceil(basePoints / 3) + honba * 100;
      dispatch(HONBA_REDUCER({TypeOfAction: 'reset'}));
    }
  } else {
    // RON
    if (winnerWind === 'east') {
      finalPoints = basePoints + honba * 300;
      dispatch(HONBA_REDUCER({TypeOfAction: 'increment'}));
    } else {
      finalPoints = basePoints + honba * 300;
      dispatch(HONBA_REDUCER({TypeOfAction: 'reset'}));
    }
  }

  finalPoints = Math.ceil(finalPoints / 100) * 100;
  // change scoring of players
  //add points to the winner
  //update scores
  dispatch(calculateScore({player: whoWon, val: finalPoints}));

  if (typeOfWin === 'TSUMO') {
    playerWhoLostToTsumo.forEach(playerName => {
      dispatch(calculateScore({player: playerName, val: -finalPoints}));
    });
  } else {
    //subtract points from losers
    dispatch(calculateScore({player: playerWhoLostToRon, val: -finalPoints}));
  }

  return {points: finalPoints, pointsName, fu};
};

export default calculatePoints;
