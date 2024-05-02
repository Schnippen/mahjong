import React from 'react';
import {FlatList, View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import DoraTileComponent from './DoraTileComponent';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
export const CurrentDoras = () => {
  const currentDoras1 = tilesData.slice(3, 8);
  const currentDoras = useSelector(
    (state: RootState) => state.wallReducer.dorasFromDeadWall,
  );
  const uncoveredCount = useSelector(
    (state: RootState) => state.wallReducer.uncoveredCount,
  );
  //const uncoveredArray = [0];
  console.log('currentDoras:', currentDoras.length);
  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
    const doraItem = currentDoras[index];
    const svg = doraItem ? doraItem.image : '';
    const isUncovered = index < uncoveredCount;
    console.log('uncoveredCount:', uncoveredCount, isUncovered);
    return (
      <DoraTileComponent svg={svg} tileRatioProp={1} uncovered={isUncovered} />
    );
  };
  const EmptyComponent = () => {
    return <View></View>;
  };
  return (
    <FlatList
      data={currentDoras}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      scrollEnabled={false}
      style={{minHeight: 45}}
      extraData={[uncoveredCount, currentDoras]}
      getItemLayout={(data, index) => ({
        length: 39,
        offset: 39 * index,
        index,
      })}
    />
  );
};
