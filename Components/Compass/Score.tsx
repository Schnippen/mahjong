import {Text} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {TplayerString} from '../../Types/types';

const Score = ({playerIndicator}: {playerIndicator: TplayerString}) => {
  //A bit of a vulgar and DRY solution, but it works well without much TypeScript boilerplate.
  let playerScoreDifference: number | undefined = 10;
  let playerScore: number | undefined = 24000;
  let player1MainScore = useSelector(
    (state: RootState) => state.playersReducer.player1.player1Score,
  );
  if (playerIndicator === 'player1') {
    playerScore = useSelector(
      (state: RootState) => state.playersReducer.player1.player1Score,
    );
  } else if (playerIndicator === 'player2') {
    playerScore = useSelector(
      (state: RootState) => state.playersReducer.player2.player2Score,
    );
  } else if (playerIndicator === 'player3') {
    playerScore = useSelector(
      (state: RootState) => state.playersReducer.player3.player3Score,
    );
  } else if (playerIndicator === 'player4') {
    playerScore = useSelector(
      (state: RootState) => state.playersReducer.player4.player4Score,
    );
  }
  if (playerIndicator === 'player1') {
    playerScoreDifference = player1MainScore;
  } else if (playerIndicator === 'player2') {
    playerScoreDifference = -player1MainScore + playerScore;
  } else if (playerIndicator === 'player3') {
    playerScoreDifference = -player1MainScore + playerScore;
  } else if (playerIndicator === 'player4') {
    playerScoreDifference = -player1MainScore + playerScore;
  }
  const scoreSystem = useSelector(
    (state: RootState) => state.settingsReducer.showScoreDifference,
  );
  let playerScoreSystem = scoreSystem ? playerScoreDifference : playerScore;
  const defaultColor = '#ffdb51';
  const positiveColor = '#9deca6';
  const negativeColor = '#ff7256';
  let scoreColor;

  if (scoreSystem) {
    if (playerIndicator === 'player1') {
      scoreColor = defaultColor;
    } else {
      scoreColor = playerScoreSystem > 0 ? positiveColor : negativeColor;
    }
  } else {
    scoreColor = defaultColor;
  }

  return (
    <Text
      style={{
        fontSize: 20,
        color: scoreColor,
        textAlignVertical: 'center',
        textAlign: 'center',
      }}
      adjustsFontSizeToFit={true}>
      {playerScoreSystem}
    </Text>
  );
};
export default Score;
