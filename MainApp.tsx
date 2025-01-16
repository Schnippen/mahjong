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

function MainApp() {
  const Stack = createNativeStackNavigator();
  /*   const dispatch = useDispatch(); */
  const updateSettings = useUpdateSettings();
  //TODO IMPORTANT!!!!!!!!!! when store is refreshed with ctrl+R, all the sounds are "preloaded" with number of channels: -1 :c
  useEffect(() => {
    console.info('first useEffect()');
    updateSettings();
    hasAndroidPermission();
  }, []);
  const RootStack = createNativeStackNavigator();

  //TODO
  /* export type RootStackParamList = {
  RulesScreenYakuExample: {name: string; data: string};
  OtherScreen: undefined; // Example for other screens
}; */
  //TODO add typescript to params and initialParams

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
