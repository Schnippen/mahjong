/*     */
import React from 'react';
import {Text, View} from 'react-native';
import {NextTurn} from '../AI-move/AIForcedNextTurn';
import {testFunction} from '../isWinning/Yaku/testFuntion';
import {Button} from '@rneui/base';
import {TTileObject} from '../../Types/types';

export const DebugToolComponent = ({
  dispatch,
  navigation,
  handData,
}: {
  dispatch: any;
  navigation: any;
  handData?: TTileObject[];
}) => {
  if (__DEV__) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{handData ? handData.length : null}</Text>
        <Button
          type="outline"
          title={'testFunction()'}
          onPress={() => {
            testFunction(dispatch, navigation);
          }}
        />
        <NextTurn />
      </View>
    );
  } else return null;
};
