import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, {useEffect, useState} from 'react';
//import {useDispatch, useSelector} from 'react-redux';
//import {RootState} from './Store/store';
import MahjongScreen from './Screens/mahjong';
import { View, Text } from 'react-native';

function MainApp() {
  const Stack = createNativeStackNavigator();
/*   const dispatch = useDispatch(); */

  useEffect(() => {
    console.info('first useEffect()');
  }, []);

  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="MahjongScreen" 
      screenOptions={{ orientation: 'landscape'}}>
        <Stack.Screen
        name="MahjongScreen"
        component={MahjongScreen}
        />
      </Stack.Navigator>
    );
  }
  
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  
    </NavigationContainer>
  );
}

export default MainApp;
