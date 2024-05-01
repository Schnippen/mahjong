import React from 'react';
import {View} from 'react-native';
import Score from './Score';

const CompassTurnIndicator = ({playerIndicator}: {playerIndicator: string}) => {
  const TriangleRight = () => {
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
  };
  const containerWidth = 200;
  return (
    <View
      style={{
        width: 200,
        height: 40,
        backgroundColor: 'transparent',
        position: 'relative',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          height: 70,
          width: containerWidth,
          backgroundColor: 'transparent',
          bottom: 0,
          position: 'absolute',
        }}>
        <View style={{width: containerWidth, position: 'relative'}}>
          <View
            style={{
              position: 'absolute',
              height: 40,
              width: 100,
              backgroundColor: 'lime',
              top: 0,
              left: 50,
            }}
          />
          <TriangleRight />
          <TriangleLeft />
        </View>
      </View>
      <View style={{backgroundColor: '#39383d', height: 30}}>
        <Score playerIndicator={playerIndicator} />
      </View>
    </View>
  );
};
export default CompassTurnIndicator;
