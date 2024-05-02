import React from 'react';
import {View, FlatList} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import {TileInTheRiverComponentFront} from '../RiverTiles/RiverTiles';

const RiverBottom = () => {
  const data = mahjongTilesSVGsArray.slice(12, 31); //river data
  //TODO add riichi indicator in conditional styling, richii tile will not be in the center ;c //-120
  //add zIndex to the last tile
  const renderItem = ({item, index}: {item: string; index: number}) => (
    <View
      style={{
        marginTop: index >= 6 && index < 18 ? -25 : index >= 18 ? -105 : 0,
        marginLeft: index >= 18 ? 360 : 0,
      }}>
      <TileInTheRiverComponentFront svg={item} tileRatioProp={2} />
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
        data={data}
        renderItem={renderItem}
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default RiverBottom;
