import React from 'react';
import {View, FlatList} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import {TileInTheRiverComponentRight} from '../RiverTiles/RiverTiles';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from '../Wall/EmptyComponent';
import { TTileObject } from '../../Types/types';

export const RiverRight = () => {
  //const data = mahjongTilesSVGsArray.slice(12, 13); //river data
  const playersRiver = useSelector(
    (state: RootState) => state.riverReducer.player2RiverState,
  );
  //TODO add riichi indicator in conditional styling, richii tile will not be in the center ;c //-120
  //add zIndex to the last tile, index >= 6 && index < 18 ? -25 : index >= 18 ? -105 : 0
  const renderItem = ({item, index}: {item: TTileObject; index: number}) => (
    <View
      style={{
        marginLeft:
          index === 18
            ? 399
            : index === 0 || index === 6 || index === 12
            ? 0
            : -14,
        marginTop: index === 18 ? -82 : 0,
        zIndex: -index,
      }}>
      <TileInTheRiverComponentRight
        svg={item.image}
        tileRatioProp={2}
        index={index}
      />
    </View>
  );
  const numOfColumns = 6;
  return (
    //480 250
    <View
      style={{
        backgroundColor: 'lightblue',
        width: 460,
        height: 250,
        transform: [{rotateZ: '270deg'}],
        alignItems: 'flex-start',
      }}>
      <FlatList
        data={playersRiver}
        renderItem={renderItem}
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => item.tileID.toString()}
        ListEmptyComponent={<EmptyComponent/>}
        extraData={playersRiver}
      />
    </View>
  );
};
