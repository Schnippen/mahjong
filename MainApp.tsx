import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {RootState} from './Store/store';
import MahjongScreen from './Screens/mahjong';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import Settings from './Screens/Settings';
import EndRoundScreen from './Screens/EndRoundScreen';
import useUpdateSettings from './Functions/utils/updateSettingsHook';
import StartGameScreen from './Screens/StartGameScreen';
import {
  hasAndroidPermission,
  savePicture,
} from './Functions/utils/cameraRollPermission';

function MainApp() {
  const Stack = createNativeStackNavigator();
  /*   const dispatch = useDispatch(); */
  const updateSettings = useUpdateSettings();

  useEffect(() => {
    console.info('first useEffect()');
    updateSettings();
    hasAndroidPermission();
  }, []);
  const RootStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MahjongScreen"
        screenOptions={{orientation: 'landscape', headerShown: false}}>
        <Stack.Screen name="MahjongScreen" component={MahjongScreen} />
        {/* <Stack.Screen name="EndGameScreen" component={EndGameScreen} /> */}
        <Stack.Screen name="StartGameScreen" component={StartGameScreen} />
        <Stack.Screen name="EndRoundScreen" component={EndRoundScreen} />
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="SettingsScreen" component={Settings} />
        </RootStack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;
