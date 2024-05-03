import React from 'react';
import {FlatList, View} from 'react-native';
import {tilesData} from '../../Data/tilesData';
import {WallTile} from '../WallTiles/WallTiles';

const DeadWall = () => {
  const data = tilesData.slice(0, 14);
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
    <View>
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
    </View>
  );
};

export default DeadWall;
