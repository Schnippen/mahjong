import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {TTileObject} from '../../Types/types';
import {customSort} from '../../Functions/sortTilesOnHand';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import TileOnHand from './TileOnHand';
import {discardTile} from '../../Functions/discardTileFunction';
import EmptyComponent from '../Wall/EmptyComponent';
import {seTemporaryDiscardableTiles} from '../../Store/playersReducer';

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
  let lastAddedTileToHandID = handData
    ? handData[handData.length - 1]?.tileID
    : null; //this might be prone to error, also it can be performance intensive
  let temporaryTilesArray = temporaryTiles.map(t => t.name);
  const handlePress = (tile: TTileObject, tileID: number) => {
    console.log(
      'HANDLE PRESS:',
      isRiichiActive,
      tileID,
      tile.name,
      'Temp:',
      temporaryTiles.map(t => t.name),
    );
    if (selected === tileID) {
      setSelected(null);
      console.log(
        gameTurn === playersWind
          ? `It's your turn - turn Interrupted:${turnInterrupted} - ${tileID}& ${tile.name} - length:${handData.length}, handDataLastIndex:${lastAddedTileToHandID}`
          : `It's NOT your turn - turn Interrupted:${turnInterrupted} - ${tileID}`,
      );
      if (gameTurn === playersWind && !turnInterrupted) {
        console.log(
          'PLAYER HAND CONDITIONAL:',
          tileID,
          'gameTurn===Pwinnd:',
          gameTurn === playersWind,
          'turnInterrupted:',
          turnInterrupted,
          'so it RUNS',
          tile.name,
        );
        //TODO add if isRichii, cannot discard = > automatic discarding of the last index??? check for win
        // When Riichi is active, I cannot remove the one unwanted tile to maintain 13 tiles in hand.
        // To resolve this, I can perform a check: if the hand length is 14, I can drop the current discard tile.
        // However, I need to determine which tiles are allowed to be discarded while preserving Riichi.
        //temporaryTiles
        if (isRiichiActive && temporaryTilesArray.includes(tile.name)) {
          console.log('TAK DZIAŁAM DEKLARACJA RIICHI DISCARD');
          discardTile('player1', tile, dispatch);
        }
        if (!isRiichiActive) {
          //NORMAL DISCARD, when Riichi button is displayed, ergo passing riichi opputunity
          setDisplayRiichiButton(false);
          console.log('TAK DZIAŁAM NORMALLL');
          discardTile('player1', tile, dispatch);
          //setDisplayRiichiFalse
          //dispatch reset temporary tiles
          dispatch(
            seTemporaryDiscardableTiles({
              TypeOfAction: 'reset',
              temporaryTiles: [],
              player: 'player1',
            }),
          );
        } //teraz pracuje nad tym, że riichi jest aktywne i muszę odrzucić klocki które się do tego nadają, czyli niekoniecznie ostatni
        /* else if(possible riichi discards, riichi must be activated to perform discards){ //
        //TODO in tenpai, possible Riichi discards, i dont know now how to fix this problem it is 2:57 am. 
        }
        else if(isRiichiActive&&selected===lastAddedTileToHandID){
        discardTile('player1', tile, dispatch);//run when player is in riichi
        } */
        //TODO automated discard !isRichiiActive pop array.at(-1)
        //discardTile('player1', tile, dispatch);
        //console.log("discardTile")
      }
    } else {
      setSelected(tileID);
      //selected a different one from the previous one was chosen
      console.log(
        'PLAYERHAND ELSE:',
        tileID,
        'isRiichiActive:',
        isRiichiActive,
        tile.name,
      );
    }
    //console.log(selected);
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
