import React, {useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {boardColor} from '../Data/colors';
import {ScreenList} from '../Types/types';
import {soundFunc, SoundType} from '../Functions/playSounds/soundFunc';
import {getFontSize} from '../Functions/utils/getFontSize';
import {ButtonStartScreen} from '../Components/Buttons/ButtonStartScreen';
//https://www.1001fonts.com/asian-fonts.html
function StartGameScreen({navigation, route}: {navigation: any; route: any}) {
  const goToScreen = (screen: ScreenList, params?: object) => {
    navigation.navigate(screen, params);
  };
  let startGameParams = {gameInitializer: 'start'};

  const GameTitle = () => {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});
    const onLayout = (event: any) => {
      const {width, height} = event.nativeEvent.layout;
      setDimensions({width, height});
    };

    let textSize = getFontSize(dimensions.height / 2);
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
            fontSize: textSize,
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
