import {Text, TouchableOpacity, View} from 'react-native';
import {handleImpactLight} from '../../Functions/utils/hapticFeedback';
import {soundFunc} from '../../Functions/playSounds/soundFunc';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function ButtonYakuGoBack() {
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
          navigation.goBack(); // Pass screen and params to navigation
          soundFunc({type: 'pop'});
          handleImpactLight();
        }}>
        <Text style={{color: 'black'}}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ButtonYakuGoBack;
