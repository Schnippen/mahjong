import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
  WallTileLeft,
  WallTileLeftIsDora,
  WallTileRight,
} from '../WallTiles/WallTiles';
import {TTileObject} from '../../Types/types';
import {tilesData} from '../../Data/tilesData';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from './EmptyComponent';
//wallWind determines the wall state data source
const WallLeft = ({wallWind = ''}: {wallWind?: string}) => {
  const [topWallTiles, setTopWallTiles] = useState<TTileObject[]>([]);
  const [bottomWallTiles, setBottomWallTiles] = useState<TTileObject[]>([]);
  const globalDiceRollResult = useSelector(
    (state: RootState) => state.wallReducer.currentDiceRoll,
  );
  const selectEastWallState = (state: RootState) =>
    state.wallReducer.wallEastState;
  const selectSouthWallState = (state: RootState) =>
    state.wallReducer.wallSouthState;
  const selectWestWallState = (state: RootState) =>
    state.wallReducer.wallWestState;
  const selectNorthWallState = (state: RootState) =>
    state.wallReducer.wallNorthState;

  const wallState = useSelector((state: RootState) => {
    switch (wallWind) {
      case 'east':
        return selectEastWallState(state);
      case 'south':
        return selectSouthWallState(state);
      case 'west':
        return selectWestWallState(state);
      case 'north':
        return selectNorthWallState(state);
      default:
        return [];
    }
  });
  const isNearDeadwall = wallWind === 'west' && globalDiceRollResult === 11;
  //console.log('wallLeft', wallState?.length);
  const topTiles = wallState.filter((_, index) => index % 2 === 0);
  const bottomTiles = wallState.filter((_, index) => index % 2 === 1);
  /* if(wallWind==="west"&&globalDiceRollResult===6){
  return marginRight: 24
} */

  const DeadWallTile = ({item, index}: {item: TTileObject; index: number}) => {
    if (item.isDora) {
      //console.log(item.isDora, item.name);
      //const marginLeft = isNearDeadwall ? 12 : index === 0 ? 0 : -12;

      return (
        <View style={{marginLeft: index === 0 ? 0 : -12}}>
          <WallTileLeftIsDora
            svg={item.image}
            tileRatioProp={1}
            key={index + 'a'}
            zIndex={1}
          />
          <Text>
            {index}
            {item.isDora}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{marginLeft: index === 0 ? 0 : -12}}>
          <WallTileLeft
            svg={item.image}
            tileRatioProp={1}
            key={index + 'a'}
            zIndex={1}
          />
          <Text>{index}</Text>
        </View>
      );
    }
  };

  const renderItem = ({item, index}: {index: number; item: any}) => {
    if (item.state === 'deadwall') {
      return <DeadWallTile item={item} index={index} />;
    } else {
      return (
        <View style={{marginLeft: index === 0 ? 0 : -12}}>
          <WallTileLeft
            svg={item.image}
            tileRatioProp={1}
            key={index + 'a'}
            zIndex={1}
          />
        </View>
      );
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'purple',
        height: 60,
        position: 'relative',
        width: 600,
        transform: [{rotateZ: '0deg'}],
        justifyContent: isNearDeadwall ? 'flex-end' : 'flex-start',
      }}>
      <FlatList
        data={topTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', top: 0}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
        extraData={wallState}
      />
      <FlatList
        data={bottomTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{
          position: 'absolute',
          top: 1,
          marginLeft: 20,
        }}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
        extraData={wallState}
      />
    </View>
  );
};

export default WallLeft;
