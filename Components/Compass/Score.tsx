import {Text} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';

const Score = ({playerIndicator}: {playerIndicator: string}) => {
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
  return (
    <Text
      style={{
        fontSize: 20,
        color: '#ffdb51',
        textAlignVertical: 'center',
        textAlign: 'center',
      }}>
      {playerScore}
    </Text>
  );
};
export default Score;
