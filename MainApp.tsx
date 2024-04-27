import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {RootState} from './Store/store';
import MahjongScreen from './Screens/mahjong';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Settings from './Screens/Settings';

function MainApp() {
  const Stack = createNativeStackNavigator();
/*   const dispatch = useDispatch(); */

  useEffect(() => {
    console.info('first useEffect()');
  }, []);
  const RootStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MahjongScreen" 
      screenOptions={{ orientation: 'landscape',headerShown:false}} >
        <Stack.Screen
        name="MahjongScreen"
        component={MahjongScreen}
        />
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
        name="Settings"
        component={Settings}
        />
        </RootStack.Group>
      </Stack.Navigator>
  
    </NavigationContainer>
  );
}

export default MainApp;
