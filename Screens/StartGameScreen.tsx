import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {boardColor} from '../Data/colors';

function StartGameScreen({navigation}: {navigation: any}) {
  const goToSettingScreen = () => {
    navigation.navigate('SettingsScreen');
  };
  const goToGameScreen = () => {
    navigation.navigate('MahjongScreen');
  };

  const GameTitle = () => {
    return (
      <View style={{backgroundColor: 'yellow'}}>
        <Text>Riichi Mahjong</Text>
      </View>
    );
  };

  const ButtonStartScreen = ({
    text,
    navigationFunction,
  }: {
    text: string;
    navigationFunction: () => void;
  }) => {
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
        onPress={navigationFunction}>
        <Text style={{color: 'black'}}>{text}</Text>
      </TouchableOpacity>
    );
  };
  const ButtonContainer = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ButtonStartScreen
          text="Start Game"
          navigationFunction={goToGameScreen}
        />
        <View style={{height: 20}} />
        <ButtonStartScreen
          text="Settings"
          navigationFunction={goToSettingScreen}
        />
        <View style={{height: 20}} />
        <ButtonStartScreen
          text="Rules"
          navigationFunction={goToSettingScreen}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: boardColor}}>
      <GameTitle />
      <ButtonContainer />
    </View>
  );
}

export default StartGameScreen;
