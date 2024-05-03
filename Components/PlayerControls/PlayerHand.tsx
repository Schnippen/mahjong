import React, {useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
import PlayerTileOnHand from './PlayerTileOnHand';
import {TTileObject} from '../../Types/types';
import {tilesData} from '../../Data/tilesData';
import {customSort} from '../../Functions/sortTilesOnHand';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
const PlayersHandComponent = ({handData}: {handData: TTileObject[]}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [sortedData, setSortedData] = useState<TTileObject[]>(handData);
  const sortTilesOnHand = useSelector(
    (state: RootState) => state.settingsReducer.sortTilesOnHand,
  );
  const turnsElapsed = useSelector(
    (state: RootState) => state.gameReducer.howManyTurnsElapsed,
  );
  const isItFirstTurn = turnsElapsed === 0 && handData.length !== 14;

  useEffect(() => {
    if (sortTilesOnHand) {
      let sortedHandData;
      if (isItFirstTurn) {
        sortedHandData = [...handData].sort(customSort); // Sort all items
      } else {
        const lastItem = handData[handData.length - 1];
        const restItems = handData.slice(0, -1);
        const sortedRestItems = [...restItems].sort(customSort);
        sortedHandData = [...sortedRestItems, lastItem];
      }
      setSortedData(sortedHandData);
    } else {
      setSortedData(handData);
    }
  }, [sortTilesOnHand, handData, isItFirstTurn]);

  console.log(
    handData.map(item => item.tileID),
    turnsElapsed,
    isItFirstTurn,
  );
  //console.log(sortedData.map(item => item.tileID));

  const handlePress = (item: string, tileID: number) => {
    if (selected === tileID) {
      setSelected(null);
    } else {
      setSelected(tileID);
    }
    console.log(selected);
  };

  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
    // Determine the value of 'shit'

    // Check if the current item is the last item
    const isLastItem = index === handData.length - 1;

    // Calculate marginLeft based on conditions
    const marginLeft = isItFirstTurn ? 0 : isLastItem ? 10 : 0;

    //console.log(index === handData.length - 1);
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
            marginLeft: marginLeft, //isLastItem ? 10 : 0,
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
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{backgroundColor: 'purple', width: 300, height: 90}}
        ListEmptyComponent={<EmptyComponent />}
        extraData={[handData, sortTilesOnHand]}
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
