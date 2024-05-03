import React from 'react';
import {Dimensions, View} from 'react-native';
import {ButtonCHII, ButtonPASS} from '../Buttons/ButtonSteal/ButtonSteal';
import PlayersHandComponent from './PlayerHand';
import {TTileObject} from '../../Types/types';
const PlayerPanel = ({handData}: {handData: TTileObject[]}) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        height: 70,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink',
        position: 'relative',
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'flex-end',
          //backgroundColor: 'brown',
          position: 'absolute',
          top: -50,
          right: 25,
          zIndex: 1,
        }}>
        <ButtonCHII />
        <ButtonPASS />
      </View>
      <PlayersHandComponent handData={handData} />
    </View>
  );
};
export default PlayerPanel;
