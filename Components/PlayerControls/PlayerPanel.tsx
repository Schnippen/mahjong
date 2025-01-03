import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import PlayerHandComponent from './PlayerHand';
import PlayerButtonsPanel from './PlayerButtonsPanel';

const PlayerPanel = ({navigation}: {navigation: any}) => {
  const screenWidth = Dimensions.get('window').width;
  const [displayRiichiButton, setDisplayRiichiButton] =
    useState<boolean>(false);
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
      <PlayerButtonsPanel
        navigation={navigation}
        displayRiichiButton={displayRiichiButton}
        setDisplayRiichiButton={setDisplayRiichiButton}
      />
      <PlayerHandComponent
        displayRiichiButton={displayRiichiButton}
        setDisplayRiichiButton={setDisplayRiichiButton}
      />
    </View>
  );
};
export default PlayerPanel;
