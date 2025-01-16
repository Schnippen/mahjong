import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {soundFunc} from '../../Functions/playSounds/soundFunc';
import {handleImpactLight} from '../../Functions/utils/hapticFeedback';
import {TTileObject} from '../../Types/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ButtonYakuExample = ({
  screen,
  params,
}: {
  screen: 'RulesScreenYakuExample'; // Screen name
  params: {name: string; data: TTileObject[]}; // Required params for this screen
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          backgroundColor: '#e9ebe8',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 3,
          borderColor: '#56a2c4',
        }}
        onPress={() => {
          //console.log('Navigating to:', screen, 'with params:', params);
          navigation.navigate(screen, params); // Pass screen and params to navigation
          soundFunc({type: 'pop'});
          handleImpactLight();
        }}>
        <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>
          See {params.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonYakuExample;
