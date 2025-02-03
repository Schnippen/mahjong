import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {resetToNextRound} from '../../Functions/resetToNextRound';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export const ButtonResetToNextRound = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //TODO add to next round, add to score screen
  return (
    <TouchableOpacity
      style={{
        height: 40,
        width: 150,
        backgroundColor: '#e9ebe8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#56a2c4',
      }}
      activeOpacity={0.9}
      onPress={() => resetToNextRound({dispatch, navigation})}>
      <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>OK</Text>
    </TouchableOpacity>
  );
};
