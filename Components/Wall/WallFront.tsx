import React from 'react';
import {FlatList, View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import {WallTile} from '../WallTiles/WallTiles';
import {Text} from '@rneui/themed';

export const WallFront = () => {
  const evenTiles: any = [];
  const oddTiles: any = [];
  const data = mahjongTilesSVGsArray.slice(0, 8);
  mahjongTilesSVGsArray.slice(0, 8).forEach((item, index) => {
    const zIndex = index % 2 === 0 ? 1 : 0;
    if (index % 2 === 0) {
      evenTiles.push(
        <WallTile svg={item} tileRatioProp={1} key={index + 'a'} zIndex={1} />,
      );
    } else {
      oddTiles.push(
        <WallTile svg={item} tileRatioProp={1} key={index + 'a'} zIndex={0} />,
      );
    }
  });

  const renderItem = ({index}: {index: number}) => {
    return (
      <View>
        <Text>{index}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        height: 80,
        position: 'relative',
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
      />
    </View>
  );
};
{
  /* <View
        style={{
          backgroundColor: 'lime',
          flexDirection: 'row',
          position: 'absolute',
          top: 10,
        }}>
        {oddTiles}
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
        }}>
        {evenTiles}
      </View> */
}
