import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import {useAppDispatch} from '../../Store/hooks';
import {setSortTileOnHand} from '../../Store/settingsReducer';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import { soundFunc } from '../../Functions/playSounds/soundFunc';
const AutoSort = () => {
  const dispatch = useAppDispatch();
  const sortTilesOnHand = useSelector(
    (state: RootState) => state.settingsReducer.sortTilesOnHand,
  );
  const handleSortToggle = () => {
    dispatch(setSortTileOnHand()); 
    if(sortTilesOnHand===true){
      soundFunc({type:"popUp"})
    }
    if(sortTilesOnHand===false){
      soundFunc({type:"pop"})
    }
  
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1 / 5,
      }}
      onPress={() => handleSortToggle()}>
      <Text
        style={{
          color: sortTilesOnHand ? 'limegreen' : 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        A
      </Text>
    </TouchableOpacity>
  );
};
const SidePanel = () => {
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        height: 200,
        width: 50,
        backgroundColor: 'red',
        left: 0,
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <AutoSort />
    </View>
  );
};

export default SidePanel;
