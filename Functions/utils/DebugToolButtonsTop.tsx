import {Button} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {initializeGame} from '../initializeGame';
import {resetToStartScreen} from '../resetToStartScreen';

const DebugToolButtonsTop = ({dispatch}: {dispatch: any}) => {
  if (__DEV__) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          top: 0,
          zIndex: 99999,
        }}>
        <Button
          style={{flex: 1, backgroundColor: 'red'}}
          title="initialize"
          onPress={() => initializeGame(dispatch)}></Button>
        <Button
          style={{flex: 1}}
          title="RESET"
          onPress={() => resetToStartScreen(dispatch)}></Button>
      </View>
    );
  } else return null;
};

export default DebugToolButtonsTop;
