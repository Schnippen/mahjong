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
): {points: number; pointsName: pointsNameType; fu: number} => {
  let whoTheWinnerIs: TWhoTheWinnerIs =
    store.getState().playersReducer.whoTheWinnerIs;
  /*retrieve the current state of `whoTheWinnerIs` from the Redux store.
   Redux state updates may not always be immediate, so we fetch the latest value directly here instead of relying on function arguments.*/
  const {
    prevailingWind,
    honba,
    playerName: whoWon,
    whoTheLoserIs: whoLost,
  } = whoTheWinnerIs;
  const playerWhoLostToRon = whoLost[0]?.loserName; //check in redux???
  const playerWhoLostToTsumo = whoLost.map(p => p);
  console.log(
    'calculatePoints is RUNNING',
    'type of win:',
    typeOfWin,
    'playerWhoLostToRon:',
    playerWhoLostToRon,
    'playerWhoLostToTsumo',
    playerWhoLostToTsumo,
    whoTheWinnerIs,
  );
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
    basePoints = fu * Math.pow(2, totalHan + 2);
    if (typeOfWin === 'RON') {
      basePoints *= 4;
    }
    if (basePoints >= 8000 && !isDealer) {
      pointsName = 'Mangan';
      basePoints = 8000;
    } else if (basePoints >= 12000 && isDealer) {
      pointsName = 'Mangan';
      basePoints = 12000;
    }
  }
  //TODO this still does not work as it should be
  //points += honba * 100;

  /*  Do sumy dodaje się wartość honba na stole (znaczniki powtórzenia rozdania) Gracz zronowany płaci 300 puntów dodatkowych za każdą honbę W przypadku tsumo każdy gracz płaci 100 punktów za każdą honbę 

   All nondealer players pay the smaller amount, while the dealer pays the larger amount.  https://riichi.wiki/Scoring_table */
  let finalPoints = basePoints;

  if (typeOfWin === 'TSUMO') {
    if (winnerWind === 'east') {
      const pointsPerPlayer = Math.ceil(basePoints / 3);
      finalPoints = pointsPerPlayer + honba * 100;
      dispatch(HONBA_REDUCER({TypeOfAction: 'increment'}));
    } else {
      finalPoints = Math.ceil(basePoints / 3) + honba * 100;
      dispatch(HONBA_REDUCER({TypeOfAction: 'reset'}));
    }
  } else if (typeOfWin === 'RON') {
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
  console.log('calculatePoints:', finalPoints, typeOfWin);
  //points added to the round winner
  dispatch(calculateScore({player: whoWon, val: finalPoints}));

  if (typeOfWin === 'TSUMO') {
    playerWhoLostToTsumo.forEach(player => {
      let name = player?.loserName;
      const paymentMultiplier = player?.paymentMultiplier ?? 0.3;
      const finalPointsCalculated = Math.floor(
        -(finalPoints * paymentMultiplier),
      );
      console.log('calculateScore: tsumo', {
        name: player?.loserName,
        points: finalPointsCalculated,
        multiplier: paymentMultiplier,
      });

      dispatch(calculateScore({player: name, val: finalPointsCalculated}));
    });
  } else if (typeOfWin === 'RON') {
    //subtract points from losers
    console.log('calculateScore: ron', playerWhoLostToRon, -finalPoints);
    dispatch(calculateScore({player: playerWhoLostToRon, val: -finalPoints}));
  }

  return {points: finalPoints, pointsName, fu};
};

export default calculatePoints;
