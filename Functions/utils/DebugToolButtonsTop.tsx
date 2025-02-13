import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {initializeGame} from '../initializeGame';
import {resetToStartScreen} from '../resetToStartScreen';

const DebugToolButtonsTop = ({dispatch}: {dispatch: any}) => {
  if (__DEV__) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 99999,
          width: 100,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'red',
            height: 50,
            width: 50,
            alignSelf: 'center',
          }}
          onPress={() => initializeGame(dispatch)}>
          <Text>initialize</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'red', height: 50, width: 50}}
          onPress={() => resetToStartScreen(dispatch)}>
          <Text>RESET</Text>
        </TouchableOpacity>
      </View>
    );
  } else return null;
};

export default DebugToolButtonsTop;
