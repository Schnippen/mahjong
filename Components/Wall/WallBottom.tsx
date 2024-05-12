import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '@rneui/themed';
import {WallTile, WallTileIsDora} from '../WallTiles/WallTiles';
import {tilesData} from '../../Data/tilesData';
import {mahjongTilessArrayWithoutDora} from '../../Assets/MahjongTiles/MahjongTiles';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {TTileObject} from '../../Types/types';
import DeadWall from './DeadWall';
import EmptyComponent from './EmptyComponent';
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

  const DeadWallTile = ({item, index}: {item: TTileObject; index: number}) => {
    if (item.isDora) {
      return (
        <View style={{marginLeft: 0 /* index === 0 ? 0 : -12 */}}>
          <WallTileIsDora
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
          <WallTile
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
  const isNearDeadwall =
  (wallWind === 'north' && globalDiceRollResult === 12) ||
  (wallWind === 'west' && globalDiceRollResult === 11)||
  (wallWind === 'south' && globalDiceRollResult === 10)||
  (wallWind === 'east' && globalDiceRollResult === 9) ||
  (wallWind === 'north' && globalDiceRollResult === 8) ||
  (wallWind === 'west' && globalDiceRollResult === 7) ||
  (wallWind === 'south' && globalDiceRollResult === 6)||
  (wallWind === 'north' && globalDiceRollResult === 4)
  const renderItem = ({item, index}: {index: number; item: TTileObject}) => {
    const marginLeft =(globalDiceRollResult===4&&wallWind==="east"&&index===3)||(globalDiceRollResult===6&&wallWind==="west"&&index===1)||(isNearDeadwall && index === 7) ? 30 :0 //too much deterministic aproach
    //console.log("wallBottom:",globalDiceRollResult===6&&wallWind==="west")
    if (item.state === 'deadwall') {
      return <DeadWallTile item={item} index={index} />;
    } else {
      //console.log(item.name, index);
      return (
        <View style={{marginLeft: marginLeft}}>
          <WallTile
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
        justifyContent: isNearDeadwall ? 'flex-end' : 'flex-start', // work TODO
        width: 600,
        transform: [{rotateZ: '0deg'}],
      }}>
      <FlatList
        data={topTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', top: 10}} //this is bottom row
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
