import {Text} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';

const Score = ({playerIndicator}: {playerIndicator: string}) => {
  let playerScoreDifference: number | undefined = 10;
  let playerScore: number | undefined = 24000;
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
    playerScoreDifference = useSelector(
      (state: RootState) => state.playersReducer.player1.player1ScoreDifference,
    );
  } else if (playerIndicator === 'player2') {
    playerScoreDifference = useSelector(
      (state: RootState) => state.playersReducer.player2.player2ScoreDifference,
    );
  } else if (playerIndicator === 'player3') {
    playerScoreDifference = useSelector(
      (state: RootState) => state.playersReducer.player3.player3ScoreDifference,
    );
  } else if (playerIndicator === 'player4') {
    playerScoreDifference = useSelector(
      (state: RootState) => state.playersReducer.player4.player4ScoreDifference,
    );
  }
  const scoreSystem  = useSelector(
    (state: RootState) => state.settingsReducer.showScoreDifference,
  );

  let playerScoreSystem=scoreSystem?playerScoreDifference:playerScore
  //console.log("playerScore",playerIndicator,playerScore) //TODO change colors and boldness
  return (
    <Text
      style={{
        fontSize: 20,
        color: '#ffdb51',
        textAlignVertical: 'center',
        textAlign: 'center',
      }}>
      {playerScoreSystem}
    </Text>
  );
};
export default Score;
