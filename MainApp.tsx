import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import MahjongScreen from './Screens/mahjong';
import Settings from './Screens/Settings';
import EndRoundScreen from './Screens/EndRoundScreen';
import useUpdateSettings from './Functions/utils/updateSettingsHook';
import StartGameScreen from './Screens/StartGameScreen';
import {
  hasAndroidPermission,
  savePicture,
} from './Functions/utils/cameraRollPermission';
import RulesScreen from './Screens/RulesScreen';
import RulesScreenYakuExample from './Screens/RulesScreenYakuExample';
import {SoundManager} from './Functions/playSounds/soundFunc';
import {ScoresScreen} from './Screens/ScoresScreen';
SoundManager.initialize();
function MainApp() {
  const Stack = createNativeStackNavigator();
  const updateSettings = useUpdateSettings();
  useEffect(() => {
    console.info('first useEffect()');
    updateSettings();
    hasAndroidPermission();
    //TODO add for iOS - hasAndroidPermission
  }, []);
  const RootStack = createNativeStackNavigator();

  //TODO
  /* export type RootStackParamList = {
  RulesScreenYakuExample: {name: string; data: string};
  OtherScreen: undefined; // Example for other screens
}; */
  //TODO add typescript to params and initialParams
  //https://www.youtube.com/watch?v=FXn1vUGCci8   //debug using react-devtools
  //npx @react-native-community/cli start --client-logs for old way of displaying console logs...
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartGameScreen"
        screenOptions={{orientation: 'landscape', headerShown: false}}>
        <Stack.Screen
          name="MahjongScreen"
          component={MahjongScreen}
          initialParams={{gameInitializer: 'none'}}
        />
        {/* <Stack.Screen name="EndGameScreen" component={EndGameScreen} /> */}
        <Stack.Screen
          name="StartGameScreen"
          component={StartGameScreen}
          initialParams={{gameInitializer: 'none'}}
        />
        <Stack.Screen name="EndRoundScreen" component={EndRoundScreen} />
        <Stack.Screen name="ScoresScreen" component={ScoresScreen} />
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="SettingsScreen" component={Settings} />
          <Stack.Screen name="RulesScreen" component={RulesScreen} />
          <Stack.Screen
            name="RulesScreenYakuExample"
            component={RulesScreenYakuExample}
          />
        </RootStack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;
