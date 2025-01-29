import React from 'react';
import {Text, View} from 'react-native';
import {boardColor} from '../Data/colors';
import useBackHandler from '../Functions/utils/useBackHandlerHook';
import {useAppDispatch} from '../Store/hooks';

export const ScoresScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useAppDispatch();
  useBackHandler(navigation, dispatch);
  //https://www.npmjs.com/package/react-native-table-component
  return (
    <View style={{backgroundColor: boardColor, flex: 1}}>
      <Text>ScoresScreen TODO add table from npm,</Text>
    </View>
  );
};
