import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import PlayerHandComponent from './PlayerHand';
import PlayerButtonsPanel from './PlayerButtonsPanel';

const PlayerPanel = ({navigation}: {navigation: any}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        height: 70,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink',
        position: 'relative',
      }}>
      <PlayerButtonsPanel navigation={navigation} />
      <PlayerHandComponent />
    </View>
  );
};
export default PlayerPanel;
