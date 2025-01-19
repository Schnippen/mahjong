import React from 'react';
import {Text, View} from 'react-native';
import {EndRoundScreenCurentDorasList} from './EndRoundScreenCurentDorasList';
import {EndScreenDoraBackgroundColor} from '../../Data/colors';

const EndRoundScreenDoras = () => {
  return (
    <View
      style={{
        backgroundColor: EndScreenDoraBackgroundColor,
        width: 240,
        flexDirection: 'row',
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, fontFamily: 'TheLastShuriken'}}>Dora</Text>
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 2,
          paddingTop: 2,
        }}>
        <EndRoundScreenCurentDorasList />
      </View>
    </View>
  );
};
export default EndRoundScreenDoras;
