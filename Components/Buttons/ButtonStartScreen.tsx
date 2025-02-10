import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {soundFunc, SoundType} from '../../Functions/playSounds/soundFunc';
import {getFontSize} from '../../Functions/utils/getFontSize';

export const ButtonStartScreen = ({
  text,
  navigationFunction,
  soundType,
}: {
  text: string;
  navigationFunction: () => void;
  soundType: SoundType;
}) => {
  const handlePress = () => {
    if (soundType) {
      soundFunc({type: soundType});
    }
    navigationFunction();
  };
  let textSize = getFontSize(16);
  return (
    <TouchableOpacity
      style={{
        width: 200,
        height: 50,
        backgroundColor: '#e9ebe8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#56a2c4',
      }}
      activeOpacity={0.9}
      onPress={handlePress}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'TheLastShuriken',
          fontSize: textSize,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
