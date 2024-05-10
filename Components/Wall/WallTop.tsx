import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {WallTile, WallTileTop, WallTileTopIsDora} from '../WallTiles/WallTiles';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from './EmptyComponent';
//wallWind determines the wall state data source
//TODO add Types
const WallTop = ({wallWind = ''}: {wallWind?: string}) => {
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

  console.log(
    'wallTop',
    wallState?.length,
    'dice:',
    globalDiceRollResult,
    wallWind === 'east' && globalDiceRollResult === 5,
    //wallState.map(x => x.name),
  );
  /*      wallWind,
    wallWind === 'south' && globalDiceRollResult === 5, 
    globalDiceRollResult === 2,
globalDiceRollResult === 3,
globalDiceRollResult === 4,
globalDiceRollResult === 5,
globalDiceRollResult === 7,
globalDiceRollResult === 7,
globalDiceRollResult === 8,
globalDiceRollResult === 9,
globalDiceRollResult === 10,
globalDiceRollResult === 11,
globalDiceRollResult === 12, */
  const topTiles = wallState.filter((_, index) => index % 2 === 1);
  const bottomTiles = wallState.filter((_, index) => index % 2 === 0);
  const DeadWallTile = ({item, index}: {item: TTileObject; index: number}) => {
    if (item.isDora) {
      return (
        <View style={{marginLeft: 0 /* index === 0 ? 0 : -12 */}}>
          <WallTileTopIsDora
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
        <View style={{marginLeft: 0 /* index === 0 ? 0 : -12 */}}>
          <WallTileTop
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
  const renderItem = ({item, index}: {index: number; item: TTileObject}) => {
    /* console.log(
      'wallTOP:',
      item.state === 'deadwall',
      item.name,
      index,
      item.isDora,
    ); */
    if (item.state === 'deadwall') {
      return <DeadWallTile item={item} index={index} />;
    } else {
      return (
        <WallTileTop
          svg={item.image}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />
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
        justifyContent: 'flex-end', // start tiles from left or right
      }}>
      <FlatList
        data={bottomTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', top: 0}} //this is bottom row
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })} //TODO perspective
        ListEmptyComponent={<EmptyComponent />}
        extraData={wallState}
      />
      <FlatList
        data={topTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true} //this is top row
        style={{position: 'absolute', top: 10}} //TODO perspective
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
export default WallTop;
