import {Text} from '@rneui/themed';
import {StickIndicator} from './StickIndicator';
import React from 'react';
import {View} from 'react-native';
import {CurrentDoras} from './CurrentDoras';
import LinearGradient from 'react-native-linear-gradient';

const DoraPanel = () => {
  const numberOfPlayers = '4P';
  const gameType = 'Friend Hanchan';

  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  return (
    <LinearGradient
      colors={[panelBackgroundColor, 'transparent']}
      useAngle={true}
      angle={180}
      angleCenter={{x: 0.5, y: 1.4}}
      style={{
        width: 170,
        height: 110,
        //backgroundColor: panelBackgroundColor,
        alignItems: 'center',
        borderRadius: 8,
        rowGap: 2,
        position: 'absolute',
        left: 0,
        zIndex: 1,
        top: 0,
      }}>
      <View
        style={{
          backgroundColor: topPanelBackgroundColor,
          width: '100%',
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}>
        <Text
          adjustsFontSizeToFit={true}
          style={{fontFamily: 'TheLastShuriken'}}>
          {numberOfPlayers + ' · ' + gameType}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <CurrentDoras />
      </View>
      <StickIndicator />
    </LinearGradient>
  );
};
export default DoraPanel;
