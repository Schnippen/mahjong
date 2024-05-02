import React from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '@rneui/themed';
import {WallTile} from '../WallTiles/WallTiles';
import {tilesData} from '../../Data/tilesData';
import {tilesData2} from '../../Data/tilesData2';
import {mahjongTilessArrayWithoutDora} from '../../Assets/MahjongTiles/MahjongTiles';
import {TTileObject} from '../../Types/types';

const WallBottom = ({wallState = []}: {wallState?: TTileObject[]}) => {
  const data = tilesData.slice(0, 17);
  const wallTopTiles = '';
  const wallBottomTiles = '';
  const renderItem = ({item, index}: {index: number; item: any}) => {
    return (
      <WallTile
        svg={item.image}
        tileRatioProp={1}
        key={index + 'a'}
        zIndex={1}
      />
    );
  };
  const EmptyComponent = () => {
    return <View></View>;
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'purple',
        height: 60,
        position: 'relative',
        justifyContent: 'flex-start',
        width: 600,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', bottom: 0}} //this is bottom row
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })} //TODO perspective
        ListEmptyComponent={<EmptyComponent />}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true} //this is top row
        style={{position: 'absolute', top: 0}} //TODO perspective
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
export default WallBottom;