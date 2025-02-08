import {Text} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';

const GameWindAndRound = () => {
  const prevailingWind = useSelector(
    (state: RootState) => state.playersReducer.whoTheWinnerIs.prevailingWind,
  );
  const round = useSelector((state: RootState) => state.gameReducer.round);
  const displayWindAndRound = prevailingWind.toUpperCase() + ' ' + (round + 1);
  return (
    <Text
      style={{
        flex: 1,
        fontSize: 22,
        textAlign: 'center',
        width: '100%',
        textAlignVertical: 'center',
        color: '#4affff',
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
      }}>
      {displayWindAndRound}
    </Text>
  );
};

export default GameWindAndRound;
