import React from 'react';
import {View} from 'react-native';
import CompassWindIndicator from './CompassWindIndicator';
import CompassTurnIndicator from './CompassTurnIndicator';
import CompassRichiiIndicator from './CompassRichiiIndicator';

const CompassPlayerSide = ({
  isRichiiActive,
  degrees = 0,
  bottomPosition = 0,
  topPosition = 0,
  leftPosition = 0,
  rightPosition = 0,
  playerIndicator = 'player1',
  compassBottomPerimeter = 320,
  currentWindDisplay,
}: {
  isRichiiActive: boolean;
  degrees: number;
  bottomPosition: number;
  topPosition: number;
  leftPosition: number;
  rightPosition: number;
  playerIndicator: string;
  compassBottomPerimeter: number;
  currentWindDisplay: string;
}) => {
  //TODO to 125 to have perspecive
  //const degrees=0
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        width: compassBottomPerimeter,
        transform: [{rotate: `${degrees}deg`}],
        position: 'absolute',
        top: rightPosition,
        left: leftPosition,
        right: rightPosition,
        bottom: bottomPosition,
      }}>
      <CompassWindIndicator currentWindDisplay={currentWindDisplay} />
      <View
        style={{
          flexDirection: 'column',
          height: 70,
          backgroundColor: 'transparent',
        }}>
        <CompassTurnIndicator
          playerIndicator={playerIndicator}
          currentWindDisplay={currentWindDisplay}
        />
        <CompassRichiiIndicator
          isRichiiActive={isRichiiActive}
          degrees={degrees}
        />
      </View>
    </View>
  );
};

export default CompassPlayerSide;
