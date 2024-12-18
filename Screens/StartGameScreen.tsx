import React, {useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {boardColor} from '../Data/colors';

function StartGameScreen({navigation}: {navigation: any}) {
  const goToSettingScreen = () => {
    navigation.navigate('SettingsScreen');
  };
  const goToGameScreen = () => {
    navigation.navigate('MahjongScreen');
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
  const GameTitle = () => {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    const onLayout = (event: any) => {
      const {width, height} = event.nativeEvent.layout;
      setDimensions({width, height});
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onLayout={onLayout}>
        <Text style={{fontSize: dimensions.height / 2, fontWeight: 'bold'}}>
          Riichi Mahjong
        </Text>
      </View>
    );
  };
  const ButtonContainer = () => {
    return (
      <View
        style={{
          flex: 2,
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
      <StatusBar hidden={true} />
      <GameTitle />
      <ButtonContainer />
    </View>
  );
}

export default StartGameScreen;
