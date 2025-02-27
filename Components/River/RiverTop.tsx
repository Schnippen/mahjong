import React from 'react';
import {FlatList, View} from 'react-native';
import {TileInTheRiverComponentTop} from '../RiverTiles/RiverTiles';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import EmptyComponent from '../Wall/EmptyComponent';
import {TTileObject} from '../../Types/types';

const RiverTop = () => {
  //const data = mahjongTilesSVGsArray.slice(0, 1); //river data
  const playersRiver = useSelector(
    (state: RootState) => state.riverReducer.player3River.riverState,
  );
  const riichiIndex = useSelector((state: RootState) => {
    let result = state.riverReducer.player3River.riichiIndex;
    return result;
  });

  const cellRenderer = ({item, index}: {item: TTileObject; index: number}) => {
    const isRiichi = index === riichiIndex;

    return (
      <View
        style={{
          marginTop: index >= 18 ? -80 : 0,
          marginLeft: index >= 18 ? 360 : 0,
          zIndex: -1,
        }}>
        <TileInTheRiverComponentTop
          isRiichi={isRiichi}
          svg={item.image}
          tileRatioProp={2}
          index={index}
        />
      </View>
    );
  };

  const numOfColumns = 6;
  return (
    <View
      style={{
        flexDirection: 'column-reverse',
        backgroundColor: 'transparent',
        width: 420,
        height: 270,
      }}>
      <FlatList
        data={playersRiver}
        renderItem={cellRenderer} // Use the custom cell renderer function
        scrollEnabled={false}
        numColumns={numOfColumns}
        keyExtractor={(item, index) => item.tileID.toString()}
        CellRendererComponent={({children}) => children}
        removeClippedSubviews={false}
        inverted={false}
        ListEmptyComponent={<EmptyComponent />}
        extraData={playersRiver}
      />
    </View>
  );
};
export default RiverTop;
