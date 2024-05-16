import React from 'react';
import {Dimensions, View} from 'react-native';
import {TTileObject} from '../../Types/types';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import { Button } from '@rneui/themed';
import { discardTile } from '../../Functions/discardTileFunction';
import PlayerHandComponent from './PlayerHand';
import PlayerButtonsPanel from './PlayerButtonsPanel';


const PlayerPanel = () => {
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
      <PlayerButtonsPanel/>
      <PlayerHandComponent />
    </View>
  );
};
export default PlayerPanel;
