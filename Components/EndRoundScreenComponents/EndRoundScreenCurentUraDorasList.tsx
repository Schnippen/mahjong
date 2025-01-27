import React from 'react';
import {tilesData} from '../../Data/tilesData';
import {RootState} from '../../Store/store';
import {useSelector} from 'react-redux';
import {TTileObject} from '../../Types/types';
import DoraTileComponent from '../DoraPanel/DoraTileComponent';
import {FlatList} from 'react-native';
import EmptyComponent from '../Wall/EmptyComponent';

export const EndRoundScreenCurentUraDorasList = () => {
  //const currentDoras = tilesData.slice(8, 13);
  //TODO create ura dora selector
  const currentDoras = useSelector(
    (state: RootState) => state.wallReducer.uraDorasFromDeadWall,
  );
  console.log(currentDoras?.map(n => n?.name));
  const uncoveredCount = useSelector(
    (state: RootState) => state.wallReducer.uncoveredCount,
  );

  const isRichiiActive = useSelector(
    (state: RootState) => state.gameReducer.winningHand.isRichiiActive,
  );
  //if uncovered doras >5 = > end game
  //const uncoveredArray = [0];
  //console.log('currentDoras:', currentDoras.length);
  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
    const doraItem = currentDoras[index];
    const svg = doraItem ? doraItem.image : '';
    const isUncovered = index < uncoveredCount;
    const willUraDoraBeDisplayed = isRichiiActive ? isUncovered : false;
    //console.log('uncoveredCount:', uncoveredCount, isUncovered);
    return (
      <DoraTileComponent
        svg={svg}
        tileRatioProp={0.8}
        uncovered={willUraDoraBeDisplayed}
      />
    );
  };

  return (
    <FlatList
      data={currentDoras}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      scrollEnabled={false}
      style={{minHeight: 30}}
      extraData={[uncoveredCount, currentDoras]}
      getItemLayout={(data, index) => ({
        length: 39,
        offset: 39 * index,
        index,
      })}
      ListEmptyComponent={<EmptyComponent />}
    />
  );
};
