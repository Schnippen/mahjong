import React, {useState} from 'react';
import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import PlayerTileOnHand from './PlayerTileOnHand';
import {TTileObject} from '../../Types/types';
import {tilesData} from '../../Data/tilesData';
import {Text} from 'react-native-svg';

const PlayersHandComponent = ({handData}: {handData: TTileObject[]}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const playersHandData = tilesData.slice(14, 28);
  const nextTile = tilesData.slice(28, 29);
  //console.log('playersHandData:', handData.length);
  console.log('selected', selected);
  const handlePress = (item: string, tileID: number) => {
    if (selected === tileID) {
      setSelected(null);
    } else {
      setSelected(tileID);
    }

    console.log('pressed:', item, tileID);
  };
  {
    /* <PlayerTileOnHand svg={item.image} tileRatioProp={1.3} /> */
  }
  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
    console.log('INDEX:', index, 'length', playersHandData.length - 1);
    return (
      <TouchableWithoutFeedback
        onPress={() => handlePress(item.name, item.tileID)}
        style={{backgroundColor: 'pink'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'blue',
            marginBottom: selected === item.tileID ? 39 * 1 : 0,
            position: 'relative',
            height: 39 * 1.3,
            width: 30 * 1.3,
            alignSelf: 'center',
            marginLeft: index === playersHandData.length - 1 ? 10 : 0,
          }}>
          <PlayerTileOnHand svg={item.image} tileRatioProp={1.3} />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const EmptyComponent = () => {
    return <View></View>;
  };
  //console.log('handData:', handData);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'brown',
        minWidth: 560,
        maxWidth: 600,
        height: 90,
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={playersHandData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{backgroundColor: 'purple', width: 300, height: 90}}
        ListEmptyComponent={<EmptyComponent />}
        extraData={handData} //39*1,3
        getItemLayout={(data, index) => ({
          length: 39 * 1.3,
          offset: 39 * 1.3 * index,
          index,
        })}
      />
      {/*  <FlatList
        horizontal
        scrollEnabled={false}
        data={nextTile}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{backgroundColor: 'red', width: 0}}
        ListEmptyComponent={<EmptyComponent />}
        extraData={handData}
        getItemLayout={(data, index) => ({
          length: 39 * 1.3,
          offset: 39 * 1.3 * index,
          index,
        })}
      /> */}
    </View>
  );
};

export default PlayersHandComponent;
//https://www.npmjs.com/package/react-native-sound