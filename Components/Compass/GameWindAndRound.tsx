import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {Text} from 'react-native';
import {getFontSize} from '../../Functions/utils/getFontSize';

const GameWindAndRound = () => {
  const prevailingWind = useSelector(
    (state: RootState) => state.playersReducer.whoTheWinnerIs.prevailingWind,
  );
  const round = useSelector((state: RootState) => state.gameReducer.round);
  const displayWindAndRound = prevailingWind.toUpperCase() + ' ' + (round + 1);
  let textSize = getFontSize(22);
  return (
    <Text
      style={{
        flex: 1,
        fontSize: textSize,
        textAlign: 'center',
        width: '100%',
        textAlignVertical: 'center',
        color: '#4affff',
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
      }}
      adjustsFontSizeToFit={true}
      minimumFontScale={0.8}>
      {displayWindAndRound}
    </Text>
  );
};

export default GameWindAndRound;
