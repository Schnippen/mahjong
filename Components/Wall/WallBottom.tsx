import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '@rneui/themed';
import {WallTile} from '../WallTiles/WallTiles';
import {tilesData} from '../../Data/tilesData';
import {mahjongTilessArrayWithoutDora} from '../../Assets/MahjongTiles/MahjongTiles';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {TTileObject} from '../../Types/types';
import DeadWall from './DeadWall';
//wallWind determines the wall state data source
const WallBottom = ({wallWind = ''}: {wallWind?: string}) => {
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

  console.log('wallBottom', wallState?.length);
  const topTiles = wallState.filter((_, index) => index % 2 === 0);
  const bottomTiles = wallState.filter((_, index) => index % 2 === 1);

  const renderItem = ({item, index}: {index: number; item: TTileObject}) => {
    //if(wallWind === 'north' && globalDiceRollResult === 8){return}
    //console.log('wallBOTTOM:', item.state === 'deadwall', item.name);
    if (item.state === 'deadwall') {
      return (
        <WallTile
          svg={item.image}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />
      );
    } else {
      return (
        <WallTile
          svg={item.image}
          tileRatioProp={1}
          key={index + 'a'}
          zIndex={1}
        />
      );
    }
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
        transform: [{rotateZ: '0deg'}],
      }}>
      <FlatList
        data={topTiles}
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
        extraData={wallState}
      />
      <FlatList
        data={bottomTiles}
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
        extraData={wallState}
      />
    </View>
  );
};
export default WallBottom;
