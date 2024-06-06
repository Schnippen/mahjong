import React from 'react';
import {View} from 'react-native';
const RichiiStick = ({degrees}: {degrees: number}) => {
  //use transform on it
  //TODO use animation
  const position =
    degrees === 0
      ? 'front'
      : degrees === 90
      ? 'right'
      : degrees === 180
      ? 'top'
      : degrees === 270
      ? 'left'
      : null;
  return (
    <View
      style={{
        width: 130,
        backgroundColor: '#bdbbc0',
        height: 18,
        borderWidth: 1,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderRadius: 6,
      }}>
      <View
        style={{
          backgroundColor: '#e9ebe8',
          width: position === 'front' || 'top' ? 126 : 124,
          height: position === 'front' || 'top' ? 14 : 16,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: position === 'front' || 'top' ? 'center' : 'flex-end',
          borderRadius: 4,
        }}>
        <View
          style={{
            backgroundColor: '#bd383b',
            height: 8,
            width: 8,
            borderRadius: 8,
          }}></View>
      </View>
    </View>
  );
};
export default RichiiStick;
