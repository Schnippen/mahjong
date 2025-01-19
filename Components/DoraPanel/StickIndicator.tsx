import React from 'react';
import {Text, View} from 'react-native';
import {HonbaStick} from './HonbaStick';
import {RichiiStick} from './RichiiStick';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
export const StickIndicator = () => {
  //TODO add honba values
  const honbaValue = useSelector(
    (state: RootState) => state.playersReducer.whoTheWinnerIs.honba,
  );
  return (
    <View
      style={{
        //backgroundColor: 'orange',
        flex: 1,
        flexDirection: 'row',
        minHeight: 30,
        maxHeight: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <RichiiStick />
      <Text style={{fontFamily: 'TheLastShuriken'}}>x 0</Text>
      <HonbaStick />
      <Text style={{fontFamily: 'TheLastShuriken'}}>x {honbaValue}</Text>
    </View>
  );
};
