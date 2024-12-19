import React from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {boardColor} from '../Data/colors';
import {ButtonGoBack} from '../Components/Buttons/ButtonGoBack';

function RulesScreen({navigation, route}: any) {
  //https://reactnavigation.org/docs/tab-view/
  return (
    <ScrollView
      style={{
        backgroundColor: boardColor,
        width: '100%',
        height: '100%',
        padding: 8,
      }}>
      <StatusBar hidden={true} />
      <View
        style={{
          alignItems: 'center',
          height: 80,
          flex: 1,
          paddingTop: 4,
        }}>
        <Text style={{fontSize: 48, fontWeight: 'bold'}}>Rules</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: 80,
            width: 100,
            position: 'absolute',
            right: 0,
          }}>
          <ButtonGoBack navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
}

export default RulesScreen;
