import React from 'react';
import {Text, View} from 'react-native';
import {EndRoundScreenCurentUraDorasList} from './EndRoundScreenCurentUraDorasList';
import {EndScreenDoraBackgroundColor} from '../../Data/colors';

const EndRoundScreenUraDoras = () => {
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
        <Text style={{fontSize: 22, fontFamily: 'TheLastShuriken'}}>Ura</Text>
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 2,
          height: 40,
          paddingTop: 2, //TODO watch this value
        }}>
        <EndRoundScreenCurentUraDorasList />
      </View>
    </View>
  );
};

export default EndRoundScreenUraDoras;
