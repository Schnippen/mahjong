import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {TTileObject} from '../../Types/types';
import {customSort} from '../../Functions/sortTilesOnHand';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import TileOnHand from './TileOnHand';
import {discardTile} from '../../Functions/discardTileFunction';
import EmptyComponent from '../Wall/EmptyComponent';
import {setTemporaryDiscardableTiles} from '../../Store/playersReducer';

const PlayerHandComponent = ({
  displayRiichiButton,
  setDisplayRiichiButton,
}: {
  displayRiichiButton: boolean;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handData = useSelector(
    (state: RootState) => state.playersReducer.player1.playerHand.hand,
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
    (state: RootState) => state.playersReducer.player1.wind,
  );

  /*   const howManyTurnsElapsed = useSelector(
    (state: RootState) => state.gameReducer.howManyTurnsElapsed,
  ); */
  const nextTileState = useSelector(
    (state: RootState) => state.wallReducer.tilesAfterHandout,
  );
  const turnInterrupted = useSelector(
    (state: RootState) => state.gameReducer.turnInterrupted,
  );

  const currentDiscard = useSelector(
    (state: RootState) => state.riverReducer.currentDiscard,
  );
  const isHelperNumberActive = useSelector(
    (state: RootState) => state.settingsReducer.settings.numerals,
  );
  const isRiichiActive = useSelector(
    (state: RootState) => state.playersReducer.player1.isRiichi,
  );
  const temporaryTiles = useSelector(
    (state: RootState) =>
      state.playersReducer.player1.temporaryDiscardableTiles,
  );
  //const isItFirstTurn = turnsElapsed === 0 && handData.length !== 14;
  //const handDataLastIndex = handData.length - 1
  //let nextTile = nextTileState[nextTileState.length-1]

  const isItFirstTurn =
    typeof turnsElapsed !== 'undefined' &&
    turnsElapsed === 0 &&
    typeof handData !== 'undefined' &&
    handData.length !== 14;

  let handDataLastIndex: number;

  if (Array.isArray(handData) && handData.length > 0) {
    handDataLastIndex = handData.length - 1;
  } else {
    console.info('handData is not defined or empty');
    handDataLastIndex = 0;
  }

  let nextTile: TTileObject | null;
  if (Array.isArray(nextTileState) && nextTileState.length > 0) {
    nextTile = nextTileState[nextTileState.length - 1];
  } else {
    console.info('nextTileState is not defined or empty');
    nextTile = null;
  }

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
  }, [sortTilesOnHand, handData, isItFirstTurn, gameTurn]);

  /* console.log(
    handData.map(item => item.tileID),
    turnsElapsed,
    isItFirstTurn,
  ); */
  let lastAddedTileToHandID = handData[handData.length - 1]?.tileID; //this might be prone to error,
  let lastTileToDiscard = handData.find(
    tile => tile.tileID === lastAddedTileToHandID,
  ); //this needs a fallback probably ;/
  //also it can be minimally be performance intensive
  //get better variable names
  //make it clean
  let temporaryTilesArray = temporaryTiles.map(t => t.name);
  const handleTileDiscard = (tile: TTileObject, tileID: number): void => {
    console.log(
      'handleTileDiscard(): Player discard logic triggered for tile:',
      tile.name,
    );

    if (isRiichiActive && temporaryTilesArray.includes(tile.name)) {
      console.log(
        'Riichi active, discarding a valid tile for declaration from temporary tiles.',
      );
      discardTile('player1', tile, dispatch);
      return;
    }

    if (!isRiichiActive) {
      setDisplayRiichiButton(false);
      console.log('NORMAL discard:', tile.name, 'ID:', tileID);
      discardTile('player1', tile, dispatch);
      if (displayRiichiButton) {
        //missing riichi opportunity
        console.log(
          'PASSING Riichi opportunity, setDisplayRiichiButton(false) = PASSED',
        );
        setDisplayRiichiButton(false);
      }
      dispatch(
        setTemporaryDiscardableTiles({
          TypeOfAction: 'reset',
          temporaryTiles: [],
          player: 'player1',
        }),
      );
      return;
    }

    if (isRiichiActive && selected === lastAddedTileToHandID) {
      //i am in riichi, drop only newest tiles
      console.log(
        'Riichi active, discarding the last added tile:',
        lastAddedTileToHandID,
      );
      lastTileToDiscard
        ? discardTile('player1', lastTileToDiscard, dispatch)
        : console.warn('Error: Last tile to discard not found.');
    }
  };

  const handlePress = (tile: TTileObject, tileID: number): void => {
    console.log('Tile pressed:', tile.name, 'ID:', tileID);
    if (selected === tileID) {
      setSelected(null);
      //Deselected tile
      if (gameTurn === playersWind && !turnInterrupted) {
        handleTileDiscard(tile, tileID);
      }
    } else {
      setSelected(tileID);
    }
  };
  const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
    const isLastItem = index === handDataLastIndex;
    const marginLeft = isItFirstTurn
      ? 0
      : isLastItem && gameTurn === playersWind && !turnInterrupted
      ? 10
      : 0;
    //console.log(index === handData.length - 1);
    //console.log("render")
    let helperNumber: string = isHelperNumberActive ? item.helperNumber : '';
    return (
      <TileOnHand
        handlePress={handlePress}
        item={item}
        index={index}
        selected={selected}
        handDataLastIndex={handDataLastIndex}
        marginLeft={marginLeft}
        helperNumber={helperNumber}
        isHelperNumberActive={isHelperNumberActive}
      />
    );
  };

  //console.log('handData:', handData);
  //TODO REFACTOR
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        minWidth: 560,
        maxWidth: 600,
        height: 90,
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <FlatList
        horizontal={true}
        scrollEnabled={false}
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{backgroundColor: 'transparent', width: 300, height: 90}} //was background purple for testing purposes
        ListEmptyComponent={<EmptyComponent />}
        extraData={[handData, sortTilesOnHand, isHelperNumberActive]}
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
