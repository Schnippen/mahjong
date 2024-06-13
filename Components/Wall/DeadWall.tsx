import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
import {WallTileTop, WallTileTopIsDora} from '../WallTiles/WallTiles';

const DeadWall = () => {
  const deadWallState = useSelector(
    (state: RootState) => state.wallReducer.deadWall,
  );

  const topTiles = deadWallState.filter((_, index) => index % 2 === 0);
  const bottomTiles = deadWallState.filter((_, index) => index % 2 === 1);
  const renderItem = ({item, index}: {index: number; item: TTileObject}) => {
    const isDora = index === 2 && bottomTiles.includes(item);
    console.log('deadwallComponent:', item.state, item.name);
    return (
      <View>
        {isDora ? (
          <WallTileTopIsDora
            svg={item.image}
            tileRatioProp={1}
            key={item.tileID}
            zIndex={1}
          />
        ) : (
          <WallTileTop
            svg={item.image}
            tileRatioProp={1}
            key={item.tileID}
            zIndex={1}
          />
        )}
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
        backgroundColor: 'lightblue',
        height: 60,
        //position: 'relative',
        width: 600,
      }}>
      <FlatList
        data={topTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.tileID.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', top: 0}} //this is bottom row
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })} //TODO perspective
        ListEmptyComponent={<EmptyComponent />}
        extraData={deadWallState}
      />
      <FlatList
        data={bottomTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.tileID.toString()}
        scrollEnabled={false}
        horizontal={true} //this is top row
        style={{position: 'absolute', top: 10}} //TODO perspective
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
        extraData={deadWallState}
      />
    </View>
  );
};

export default DeadWall;
