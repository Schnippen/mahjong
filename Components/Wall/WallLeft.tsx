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
import isNearDeadWallFunction from '../../Functions/isNearDeadWallFunction';
import {wallLeftAbsoluteLeft} from '../../Functions/WallVisuals/WallDirections';
//wallWind determines the wall state data source
const WallLeft = ({wallWind = ''}: {wallWind?: string}) => {
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
  const topTiles = wallState.filter((_, index) => index % 2 === 0);
  const bottomTiles = wallState.filter((_, index) => index % 2 === 1);
  /* console.log(
    'wallLeft',
    wallState?.length,
    'topTiles:',
    topTiles.length,
    'bottomTiles:',
    bottomTiles.length,
    topTiles.map(i => i.helperNumber),
  ); */
  /* if(wallWind==="west"&&globalDiceRollResult===6){
  return marginRight: 24
} */

  const DeadWallTile = ({item, index}: {item: TTileObject; index: number}) => {
    if (item.isDora) {
      return (
        <View style={{marginLeft: index === 0 ? 0 : -12}}>
          <WallTileLeftIsDora
            svg={item.image}
            tileRatioProp={1}
            key={index + 'a'}
            zIndex={1}
          />
          <Text>
            {index + 1}
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
          <Text>{index + 1}</Text>
        </View>
      );
    }
  };

  const isNearDeadwall = isNearDeadWallFunction({
    wallWind,
    globalDiceRollResult,
  });

  const renderItem = ({item, index}: {index: number; item: any}) => {
    const marginLeft =
      (globalDiceRollResult === 3 && wallWind === 'north' && index == 4) ||
      (globalDiceRollResult === 6 && wallWind === 'west' && index === 1) ||
      (globalDiceRollResult === 4 && wallWind === 'east' && index === 3) ||
      (isNearDeadwall && index === 7)
        ? 12
        : index === 0
        ? 0
        : -12;
    //console.log("wallLeft",isNearDeadwall)
    if (item.state === 'deadwall') {
      return <DeadWallTile item={item} index={index} />;
    } else {
      return (
        <View
          style={{
            marginLeft: marginLeft,
          }}>
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
  console.info(
    'WALL LEFT:',
    wallLeftAbsoluteLeft(globalDiceRollResult, wallWind),
    'isNearDeadWall:',
    isNearDeadwall,
  );
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
        style={{position: 'absolute', top: 0, left: 13}} //Styling problems in "left" property?
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
          top: 2,
          right: isNearDeadwall ? 0 : null,
          left:
            globalDiceRollResult === 6 && wallWind === 'east'
              ? 0
              : (globalDiceRollResult === 6 && wallWind === 'south') ||
                (globalDiceRollResult === 9 && wallWind === 'east') ||
                (globalDiceRollResult === 8 && wallWind === 'north') ||
                (globalDiceRollResult === 11 && wallWind === 'west') ||
                (globalDiceRollResult === 3 && wallWind === 'west') ||
                (globalDiceRollResult === 5 && wallWind === 'east') ||
                (globalDiceRollResult === 4 && wallWind === 'north') ||
                (globalDiceRollResult === 12 && wallWind === 'north') ||
                (globalDiceRollResult === 10 && wallWind === 'south') ||
                (globalDiceRollResult === 7 && wallWind === 'west') ||
                (globalDiceRollResult === 2 && wallWind === 'south')
              ? null
              : isNearDeadwall
              ? 10
              : null,
        }} //TODO FIX the "left" styling east 9 error
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
