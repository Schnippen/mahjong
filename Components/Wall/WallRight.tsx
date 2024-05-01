import React from 'react';
import {FlatList, View} from 'react-native';
import {TTileObject} from '../../Types/types';
import {tilesData} from '../../Data/tilesData';
import {WallTileRight} from '../WallTiles/WallTiles';

const WallRight = ({wallState = []}: {wallState?: TTileObject[]}) => {
  const data = tilesData.slice(0, 17);
  const wallTopTiles = '';
  const wallBottomTiles = '';

  const renderItem = ({item, index}: {index: number; item: any}) => {
    return (
      <View style={{marginLeft: index === 0 ? 0 : -12, zIndex: -index}}>
        <WallTileRight
          svg={item.image}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />
      </View>
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
        justifyContent: 'center',
        width: 600,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', left: 0, top: 0}} //this is bottom row
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
        style={{position: 'absolute', left: 10}} //TODO perspective
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

export default WallRight;
