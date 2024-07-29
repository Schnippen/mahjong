import store from '../../Store/store';
import {
  GameWinds,
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
): {points: number; pointsName: pointsNameType; fu: number} => {
  let prevailingWind: WindTypes = store.getState().gameReducer.prevailingWind;

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

  if (typeOfWin === 'TSUMO') {
    if (winnerWind === 'east') {
      points *= 2;
    } else {
      points = Math.ceil((points * 2) / 3);
    }
  } else if (typeOfWin === 'RON') {
    if (winnerWind === 'east') {
      points *= 6;
    } else {
      points *= 4;
    }
  }

  points = Math.ceil(points / 100) * 100;

  return {points, pointsName, fu};
};
//return POINTS // POINTS NAME
export default calculatePoints;
