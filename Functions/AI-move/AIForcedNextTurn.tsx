import React from 'react';
import AITurnAutomated from './AITurnAutomated';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@rneui/base';
import {RootState} from '../../Store/store';

export const NextTurn = () => {
  const gameTurn = useSelector(
    (state: RootState) => state.gameReducer.currentTurn,
  );
  const dispatch = useDispatch();
  const {
    playersReducer: {player1, player2, player3, player4},
  } = useSelector((state: RootState) => state);
  const {
    riverReducer: {player1River, player2River, player3River, player4River},
  } = useSelector((state: RootState) => state);
  return (
    <Button
      title={'AITURN'}
      onPress={() =>
        AITurnAutomated(
          dispatch,
          gameTurn,
          player1.wind,
          player2.wind,
          player3.wind,
          player4.wind,
          player2.playerHand.hand,
          player3.playerHand.hand,
          player4.playerHand.hand,
          player1.playerHand.melds,
          player2.playerHand.melds,
          player3.playerHand.melds,
          player4.playerHand.melds,
          player1River.riverState,
          player2River.riverState,
          player3River.riverState,
          player4River.riverState,
          player1River.riichiIndex,
          player2River.riichiIndex,
          player3River.riichiIndex,
          player4River.riichiIndex,
        )
      }
      type="outline"
    />
  );
};
