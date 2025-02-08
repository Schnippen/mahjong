import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export const ButtonToScoresScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      onPress={() => navigation.navigate('ScoresScreen')}>
      <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>OK</Text>
    </TouchableOpacity>
  );
};
