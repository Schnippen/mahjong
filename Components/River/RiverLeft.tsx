import {View, FlatList} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import {TileInTheRiverComponentLeft} from '../RiverTiles/RiverTiles';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from '../Wall/EmptyComponent';
import {TTileObject} from '../../Types/types';

export const RiverLeft = () => {
  const playersRiver = useSelector(
    (state: RootState) => state.riverReducer.player4River.riverState,
  );

  const riichiIndex = useSelector((state: RootState) => {
    let result = state.riverReducer.player4River.riichiIndex;
    return result;
  });

  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
    const isRiichi = index === riichiIndex;
    return (
      <View
        style={{
          alignItems: 'flex-start',
          marginRight: index === 5 || index === 11 || index === 17 ? 0 : -14,
          marginTop: index === 18 ? -82 : 0,
          marginLeft: index === 18 ? 385 : 0,
          /* marginLeft: index === 18? 399 : (index === 0 || index === 6 || index === 12 ? 0 : -14),
        marginTop: index === 18 ? -82 : 0,
        zIndex:-index */
        }}>
        <TileInTheRiverComponentLeft
          svg={item.image}
          tileRatioProp={2}
          index={index}
          isRiichi={isRiichi}
        />
      </View>
    );
  };
  const numOfColumns = 6;
  return (
    //480 250
    <View
      style={{
        backgroundColor: 'transparent',
        width: 460,
        height: 250,
        transform: [{rotateZ: '90deg'}],
        alignItems: 'flex-start',
      }}>
      <FlatList
        data={playersRiver}
        style={{backgroundColor: 'transparent', width: '100%'}}
        renderItem={renderItem}
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => item.tileID.toString()}
        ListEmptyComponent={<EmptyComponent />}
        extraData={playersRiver}
      />
    </View>
  );
};
