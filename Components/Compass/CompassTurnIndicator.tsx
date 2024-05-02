import React from 'react';
import {View} from 'react-native';
import Score from './Score';
import TurnIndicator from './TurnIndicator';

const CompassTurnIndicator = ({playerIndicator}: {playerIndicator: string}) => {
  return (
    <View
      style={{
        width: 200,
        height: 40,
        backgroundColor: 'transparent',
        position: 'relative',
        justifyContent: 'flex-end',
      }}>
      <View style={{backgroundColor: 'transparent', height: 30}}>
        <TurnIndicator />
      </View>
      <View style={{backgroundColor: '#39383d', height: 30}}>
        <Score playerIndicator={playerIndicator} />
      </View>
    </View>
  );
};
export default CompassTurnIndicator;

/*   const TriangleRight = () => {
    return (
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 0,
          borderRightWidth: 50,
          borderBottomWidth: 40,
          borderTopWidth: 0,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'lime',
          borderTopColor: 'lime',
          position: 'absolute',
          top: 0,
          right: 0,
        }}></View>
    );
  };
  const TriangleLeft = () => {
    return (
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 50,
          borderRightWidth: 0,
          borderBottomWidth: 40,
          borderTopWidth: 0,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'lime',
          borderTopColor: 'lime',
          position: 'absolute',
          top: 0,
          left: 0,
        }}></View>
    );
  }; */
