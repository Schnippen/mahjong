import React from 'react';
import {View} from 'react-native';
const Triangle = () => {
  return (
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: 30,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 30,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#39383d',
        borderTopColor: '#39383d',
        position: 'absolute',
        top: 0,
        right: 0,
      }}></View>
  );
};
export default Triangle;
