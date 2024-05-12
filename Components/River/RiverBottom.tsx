import React from 'react';
import {View, FlatList} from 'react-native';
import {TileInTheRiverComponentFront} from '../RiverTiles/RiverTiles';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from '../Wall/EmptyComponent';
import { TTileObject } from '../../Types/types';
import { tilesData } from '../../Data/tilesData';
const RiverBottom = () => {
 // const data = tilesData.slice(12, 31); //river data
  //TODO add riichi indicator in conditional styling, richii tile will not be in the center ;c //-120
  //add zIndex to the last tile
  const playersRiver = useSelector(
    (state: RootState) => state.riverReducer.player1RiverState,
  );
  
  const renderItem = ({item, index}: {item: TTileObject; index: number}) => (
    <View
      style={{
        marginTop: index >= 6 && index < 18 ? -25 : index >= 18 ? -105 : 0,
        marginLeft: index >= 18 ? 360 : 0,
      }}>
      <TileInTheRiverComponentFront svg={item.image} tileRatioProp={2} />
    </View>
  );
  const numOfColumns = 6;
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        width: 420,
        height: 270,
      }}>
      <FlatList
        data={playersRiver}
        renderItem={renderItem}
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyComponent/>}
        extraData={playersRiver}
      />
    </View>
  );
};
export default RiverBottom;
