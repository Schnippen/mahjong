import React, {useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {boardColor} from '../Data/colors';
import {ScreenList} from '../Types/types';
import {soundFunc, SoundType} from '../Functions/playSounds/soundFunc';
//https://www.1001fonts.com/asian-fonts.html
function StartGameScreen({navigation, route}: {navigation: any; route: any}) {
  const goToScreen = (screen: ScreenList, params?: object) => {
    navigation.navigate(screen, params);
  };
  let startGameParams = {gameInitializer: 'start'};
  const ButtonStartScreen = ({
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
        soundFunc({type: soundType}); // Call soundFunc with the correct structure
      }
      navigationFunction();
    };
    console.log('START GAME SCREEN ROUTE:', route);
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
        <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>
          {text}
        </Text>
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
        <Text
          style={{
            fontSize: dimensions.height / 2,
            fontFamily: 'TheLastShuriken',
          }}>
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
          navigationFunction={() => {
            goToScreen('MahjongScreen', startGameParams);
          }}
          soundType="pop"
        />
        <View style={{height: 20}} />
        <ButtonStartScreen
          text="Settings"
          navigationFunction={() => goToScreen('SettingsScreen')}
          soundType="popUp"
        />
        <View style={{height: 20}} />
        <ButtonStartScreen
          text="Rules"
          navigationFunction={() => goToScreen('RulesScreen')}
          soundType="popUp"
        />
      </View>
    );
  };
  //Initiate game from 1-2 seconds after clicking, or maybe use dice sound intead of ronTsumoSound
  return (
    <View style={{flex: 1, backgroundColor: boardColor}}>
      <StatusBar hidden={true} />
      <GameTitle />
      <ButtonContainer />
    </View>
  );
}

export default StartGameScreen;
