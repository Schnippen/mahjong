import {INTERRUPT_TURN, START_GAME} from '../../Store/gameReducer';
import {
  changeWhoTheLoserIs,
  changeWhoTheWinnerIs,
} from '../../Store/playersReducer';
import {TplayerString, WindTypes} from '../../Types/types';
import {soundFunc} from '../playSounds/soundFunc';
type ThandleAIWin = {
  ron: boolean;
  tsumo: boolean;
  navigation: any;
  dispatch: any;
  playerName: TplayerString;
  winnerWind: WindTypes;
  latestTurn: WindTypes;
  player2Wind: WindTypes;
  player3Wind: WindTypes;
  player4Wind: WindTypes;
};
export const handleAIWin = ({
  ron,
  tsumo,
  navigation,
  dispatch,
  playerName,
  winnerWind,
  latestTurn,
  player2Wind,
  player3Wind,
  player4Wind,
}: ThandleAIWin) => {
  const handleGameEnd = (winType: 'ron' | 'tsumo') => {
    dispatch(START_GAME({phase: 'ended'}));
    dispatch(INTERRUPT_TURN({val: true}));
    soundFunc({type: winType});
  };

  if (ron && playerName !== 'player1') {
    console.log(`handleAIWin(): AI player ${playerName} pressed RON ^^^^^^^^^`);
    //handle ron PLAYER
    handleGameEnd('ron');

    dispatch(
      changeWhoTheWinnerIs({
        TypeOfAction: 'update',
        valuePlayerName: playerName,
        valuePlayerWind: winnerWind,
      }),
      changeWhoTheLoserIs({
        TypeOfAction: 'updateRON',
        valuePlayerName: latestTurn,
        valuePlayerWind: latestTurn, //it may not work due to the order of AIAutomatedTurn and runGame().
      }),
    );
    navigation.navigate('EndRoundScreen');
  }
  if (tsumo && playerName !== 'player1') {
    const playerWindMap: Record<string, WindTypes> = {
      //wintypes has "null"
      player2: player2Wind,
      player3: player3Wind,
      player4: player4Wind,
    };
    const AIWinningWind = playerWindMap[playerName];
    if (!AIWinningWind) {
      console.error(`Invalid playerName: ${playerName}`);
      //this won't happen, but a fallback is welcome
      return;
    }
    //must be the correct player turn ....
    console.log(
      `handleAIWin(): AI player ${playerName} pressed TSUMO ^^^^^^^^^`,
    );
    handleGameEnd('tsumo');
    dispatch(
      changeWhoTheWinnerIs({
        TypeOfAction: 'update',
        valuePlayerName: playerName,
        valuePlayerWind: AIWinningWind,
      }),
      changeWhoTheLoserIs({
        TypeOfAction: 'updateTSUMO',
        valuePlayerName: playerName,
        valuePlayerWind: AIWinningWind,
      }),
    );
    navigation.navigate('EndRoundScreen');
  }
};
