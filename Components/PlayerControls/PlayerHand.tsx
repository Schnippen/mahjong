import React, {useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../Assets/MahjongTiles/MahjongTiles';
//import PlayerTileOnHand from './PlayerTileOnHand';
import {TTileObject} from '../../Types/types';
import {tilesData} from '../../Data/tilesData';
import {customSort} from '../../Functions/sortTilesOnHand';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import TileOnHand from './TileOnHand';
import { discardTile } from '../../Functions/discardTileFunction';

const PlayerHandComponent = () => {
  const handData = useSelector(
    (state: RootState) => state.handReducer.player1Hand,
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [sortedData, setSortedData] = useState<TTileObject[]>(handData);
  const dispatch = useDispatch();

  const sortTilesOnHand = useSelector(
    (state: RootState) => state.settingsReducer.sortTilesOnHand,
  );
  const turnsElapsed = useSelector(
    (state: RootState) => state.gameReducer.howManyTurnsElapsed,
  );

  const gameTurn = useSelector(
    (state: RootState) => state.gameReducer.currentTurn,
  );

  //main player is bottom one
  const playersWind = useSelector(
    (state: RootState) => state.playersReducer.player1.player1Wind,
  );

  const isItFirstTurn = turnsElapsed === 0 && handData.length !== 14;
  const handDataLastIndex = handData.length - 1

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

  /* console.log(
    handData.map(item => item.tileID),
    turnsElapsed,
    isItFirstTurn,
  ); */
  const turnInterrupted=useSelector(
    (state: RootState) => state.gameReducer.turnInterrupted,
  );

  const handlePress = (tile: TTileObject, tileID: number) => {
    if (selected === tileID) {
      setSelected(null);
      console.log(gameTurn===playersWind?`It's your turn ${turnInterrupted}`:"It's NOT your turn")
      if(gameTurn===playersWind && !turnInterrupted){
      discardTile("player1", tile,dispatch)
      //console.log("discardTile")
    }
    } else {
      setSelected(tileID);
    }
    //console.log(selected);
  };

  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
     const isLastItem = index ===handDataLastIndex;
    const marginLeft = isItFirstTurn ? 0 : isLastItem ? 10 : 0;
    //console.log(index === handData.length - 1);
    //console.log("render")
    return (
      <TileOnHand handlePress={handlePress} item={item} index={index}  selected={selected} handDataLastIndex={handDataLastIndex} marginLeft={marginLeft}/>
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
    </View>
  );
};

export default PlayerHandComponent;
//https://www.npmjs.com/package/react-native-sound
