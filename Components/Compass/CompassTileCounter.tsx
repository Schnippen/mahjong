import React from 'react';
import {View} from 'react-native';
import GameWindAndRound from './GameWindAndRound';
import TilesLeftInTheGame from './TilesLeftInTheGame';

const CompassTileCounter = ({
  compassTilesCounterBottomPerimeter,
}: {
  compassTilesCounterBottomPerimeter: number;
}) => {
  //317  /100 //center piece
  return (
    <View
      style={{
        backgroundColor: '#1d1d1f',
        width: compassTilesCounterBottomPerimeter,
        height: compassTilesCounterBottomPerimeter,
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#1b2a2d',
        borderRadius: 2,
      }}>
      <GameWindAndRound />
      <TilesLeftInTheGame />
    </View>
  );
};
export default CompassTileCounter;
