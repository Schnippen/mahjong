import React from 'react';
import {FlatList, View} from 'react-native';
import {TileInTheRiverComponentTop} from '../RiverTiles/RiverTiles';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';

const RiverTop = () => {
  const data = mahjongTilesSVGsArray.slice(0, 1); //river data
  //TODO add riichi indicator in conditional styling, richii tile will not be in the center ;c //-120 elevation: 1
  //add zIndex to the last tile //TODO just use transform translate flip it on its head and flip Y axis
  const cellRenderer = ({item, index}: {item: string; index: number}) => (
    <View
      style={{
        marginTop: index >= 18 ? -80 : 0,
        marginLeft: index >= 18 ? 360 : 0,
        zIndex: -1,
      }}>
      <TileInTheRiverComponentTop svg={item} tileRatioProp={2} index={index} />
    </View>
  );

  const numOfColumns = 6;
  return (
    <View
      style={{
        flexDirection: 'column-reverse',
        backgroundColor: 'lightblue',
        width: 420,
        height: 270,
      }}>
      <FlatList
        data={data}
        renderItem={cellRenderer} // Use the custom cell renderer function
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => index.toString()}
        CellRendererComponent={({children}) => children}
        removeClippedSubviews={false}
        inverted={false}
      />
    </View>
  );
};
export default RiverTop;
