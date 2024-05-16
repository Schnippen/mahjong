import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TTileObject} from '../../Types/types';
import {tilesData} from '../../Data/tilesData';
import {WallTileRight, WallTileRightIsDora} from '../WallTiles/WallTiles';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from './EmptyComponent';
import isNearDeadWallFunction from '../../Functions/isNearDeadWallFunction';
//wallWind determines the wall state data source
const WallRight = ({wallWind = ''}: {wallWind?: string}) => {
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

  //console.log('wallRight', wallState?.length, 'wallWind:', wallWind);

  const topTiles = wallState.filter((_, index) => index % 2 === 1);
  const bottomTiles = wallState.filter((_, index) => index % 2 === 0);
  const DeadWallTile = ({item, index}: {item: TTileObject; index: number}) => {
    if (item.isDora) {
      return (
        <View style={{marginLeft: index === 0 ? 0 : -12, zIndex: -index}}>
          <WallTileRightIsDora
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
        <View style={{marginLeft: index === 0 ? 0 : -12, 
          zIndex: -index,
          marginRight:(globalDiceRollResult === 6 && wallWind === "west"&&index===0)?12:null
      }}>
          <WallTileRight
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

  const isNearDeadwall = isNearDeadWallFunction({wallWind,globalDiceRollResult})
  
  const directionOfWall =(wallWind === 'west' && globalDiceRollResult === 2) // wallWind === 'north' && globalDiceRollResult === 7;
  const leftAbsoluteDeadWall=''
  
  const renderItem = ({item, index}: {index: number; item: TTileObject}) => {
      //console.log('wallRight:',isNearDeadwall) 
    const marginLeft = 
    (wallWind === 'west' && globalDiceRollResult === 2&&index===5)||(wallWind === 'south' && globalDiceRollResult === 5&&index===2)||(wallWind === 'east' && globalDiceRollResult === 4&&index===3)||isNearDeadwall && index === 7 ? 12 : index === 0 ? 0 : -12;
    
    
    if (item.state === 'deadwall') {
      return <DeadWallTile item={item} index={index} />;
    } else {
      return (
        <View
          style={{
            marginLeft: marginLeft,
            zIndex: -index,
          }}>
          <WallTileRight
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
        justifyContent:
          isNearDeadwall || directionOfWall ? 'flex-end' : 'flex-start',
      }}>
      <FlatList
        data={bottomTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
        style={{position: 'absolute', right: isNearDeadwall ? 10 : null,}} //this is bottom row //TODO fix, problems with styling
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
        extraData={wallState}
      />
      <FlatList
        data={topTiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true} //this is top row
        style={{position: 'absolute',right: isNearDeadwall ? 0 : null,
        top:2,left:(globalDiceRollResult===3&&wallWind==="east")||!isNearDeadwall?10:null}} //TODO many problems with "left" during set up
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

export default WallRight;
