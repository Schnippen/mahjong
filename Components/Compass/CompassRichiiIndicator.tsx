import React from 'react';
import {View} from 'react-native';
import RichiiStick from './RichiiStick/RichiiStick';

const CompassRichiiIndicator = ({
  isRichiiActive,
  degrees,
}: {
  isRichiiActive: boolean;
  degrees: number;
}) => {
  return (
    <View
      style={{
        width: 200,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#5d5d69',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'black',
          height: 20,
          width: 150,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isRichiiActive ? <RichiiStick degrees={degrees} /> : null}
      </View>
    </View>
  );
};
export default CompassRichiiIndicator;
