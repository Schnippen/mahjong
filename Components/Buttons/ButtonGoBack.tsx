import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {handleImpactLight} from '../../Functions/utils/hapticFeedback';
import {soundFunc} from '../../Functions/playSounds/soundFunc';

export const ButtonGoBack = ({navigation}: {navigation: any}) => {
  const goToHomeScreen = () => {
    navigation.navigate('StartGameScreen');
    soundFunc({type: 'pop'});
    handleImpactLight();
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToHomeScreen()}>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#56a2c4',
          alignItems: 'center',
          borderRadius: 25,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e9ebe8',
          }}>
          <Text style={{color: 'black'}}>{'X'}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};