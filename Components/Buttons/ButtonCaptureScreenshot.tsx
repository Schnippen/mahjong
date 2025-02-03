import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {soundFunc} from '../../Functions/playSounds/soundFunc';
import {captureScrenshot} from '../../Functions/utils/captureScreenshot';

export const ButtonCaptureScreenshot = () => {
  return (
    <TouchableOpacity
      style={{
        height: 40,
        width: 75,
        backgroundColor: '#e9ebe8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#56a2c4',
      }}
      activeOpacity={0.9}
      onPress={() => {
        console.log('SCRENSHOT Pressed'), captureScrenshot();
        //TODO check if this is working
        soundFunc({type: 'shutter'});
      }}>
      <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>
        {`[◉°]`}
      </Text>
    </TouchableOpacity>
  );
};
