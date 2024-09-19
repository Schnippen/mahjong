import {calculateScore, HONBA_REDUCER} from '../../Store/playersReducer';
import store from '../../Store/store';
import {
  pointsNameType,
  TstolenTiles,
  TTileObject,
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
): {points: number; pointsName: pointsNameType; fu: number} => {
  //TODO move state as prop, do not get it inside function, optimize it
  let prevailingWind: WindTypes =
    store.getState().playersReducer.whoTheWinnerIs.prevailingWind;
  let honba: number = store.getState().playersReducer.whoTheWinnerIs.honba;
  let whoWon = store.getState().playersReducer.whoTheWinnerIs.playerName;
  let whoLost = store.getState().playersReducer.whoTheWinnerIs.whoTheLoserIs;
  let playerWhoLostToRon = whoLost[0]?.loserName;
  let playerWhoLostToTsumo = whoLost.map(p => p?.loserName);
  let fu = calculateFu(
    hand,
    currentMelds,
    typeOfWin,
    discard,
    playersWind,
    prevailingWind,
  );

  let points = 0;
  let pointsName: pointsNameType = '';

  if (totalHan >= 13) {
    points = 8000;
    pointsName = 'Yakuman';
  } else if (totalHan >= 11) {
    points = 6000;
    pointsName = 'Sanbaiman';
  } else if (totalHan >= 8) {
    points = 4000;
    pointsName = 'Baiman';
  } else if (totalHan >= 6) {
    points = 3000;
    pointsName = 'Haneman';
  } else if (totalHan >= 5) {
    points = 2000;
    pointsName = 'Mangan';
  } else {
    // Calculate base points
    points = fu * 2 ** (totalHan + 2);

    if (points >= 2000) {
      points = 2000;
      pointsName = 'Mangan';
    } else {
      pointsName = '';
    }
  }
  //points += honba * 100;

  /*  Do sumy dodaje się wartość honba na stole (znaczniki powtórzenia rozdania) Gracz zronowany płaci 300 puntów dodatkowych za każdą honbę W przypadku tsumo każdy gracz płaci 100 punktów za każdą honbę  */

  /* All nondealer players pay the smaller amount, while the dealer pays the larger amount.  https://riichi.wiki/Scoring_table*/
  if (typeOfWin === 'TSUMO') {
    points += honba * 100;
    if (winnerWind === 'east') {
      points *= 2;
      dispatch(HONBA_REDUCER({TypeOfAction: 'increment'}));
    } else {
      points = Math.ceil((points * 2) / 3); // non-east players pay 1/3 of points each
      dispatch(HONBA_REDUCER({TypeOfAction: 'reset'}));
    }
  } else if (typeOfWin === 'RON') {
    points += honba * 300;
    if (winnerWind === 'east') {
      points *= 6;
      dispatch(HONBA_REDUCER({TypeOfAction: 'increment'}));
    } else {
      points *= 4;
      dispatch(HONBA_REDUCER({TypeOfAction: 'reset'}));
    }
  }

  points = Math.ceil(points / 100) * 100;
  // change scoring of players
  //add points to the winner
  dispatch(calculateScore({player: whoWon, val: points}));
  //subtract points from losers
  if (typeOfWin === 'TSUMO') {
    playerWhoLostToTsumo.forEach(playerName => {
      dispatch(calculateScore({player: playerName, val: -points}));
    });
  } else if (typeOfWin === 'RON') {
    dispatch(calculateScore({player: playerWhoLostToRon, val: -points}));
  }

  return {points, pointsName, fu};
};
//return POINTS // POINTS NAME
export default calculatePoints;
