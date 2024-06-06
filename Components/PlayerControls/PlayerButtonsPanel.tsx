import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';

import {Button} from '@rneui/themed';
import {TTileObject} from '../../Types/types';
import {discardTile} from '../../Functions/discardTileFunction';
import {
  ButtonCHII,
  ButtonKAN,
  ButtonPASS,
  ButtonPON,
  ButtonRIICHI,
} from '../Buttons/ButtonSteal/ButtonSteal';
import {Text, View} from 'react-native';
import {runGame} from '../../Functions/runGame';
import { PassActionFunc } from '../../Functions/PlayerControlFunctions/PassActionFunc';
import { stealTriplet } from '../../Functions/StealingFunctions/stealTriplet';
import { handlePon } from '../../Functions/PlayerControlFunctions/handlePon';
import { checkOrStealSequence } from '../../Functions/checkOrStealSequence';
import { handleChii } from '../../Functions/PlayerControlFunctions/handleChii';
import ChooseSequencePanel from './ChooseSequencePanel/ChooseSequencePanel';
import { handleRiichi } from '../../Functions/PlayerControlFunctions/handleRiichi';

const chooseRandomTile = (hand: TTileObject[]) => {
  let max = hand.length - 1;
  let dropLastTile = max;
  let dropRandomTile = Math.floor(Math.random() * max);
  let sixtyPercentChance = Math.floor(Math.random() * 11) <= 6;
  let result = sixtyPercentChance ? dropLastTile : dropRandomTile;
  let tileToDiscard = hand[result];
  //console.log("tileToDiscard:",max, dropLastTile, result, tileToDiscard?.name )
  return tileToDiscard;
};

const NextTurn = () => {
  const gameTurn = useSelector(
    (state: RootState) => state.gameReducer.currentTurn,
  );
  const dispatch = useDispatch();

  const humanPlayerHand = useSelector(
    (state: RootState) => state.playersReducer.player1.playerHand.hand,
  );

  const playerRightHand = useSelector(
    (state: RootState) => state.playersReducer.player2.playerHand.hand,
  );
  const playerTopHand = useSelector(
    (state: RootState) => state.playersReducer.player3.playerHand.hand,
  );
  const playerLeftHand = useSelector(
    (state: RootState) => state.playersReducer.player4.playerHand.hand,
  );

  const humanPlayerWind = useSelector(
    (state: RootState) => state.playersReducer.player1.wind,
  );
  const playerRightWind = useSelector(
    (state: RootState) => state.playersReducer.player2.wind,
  );
  const playerTopWind = useSelector(
    (state: RootState) => state.playersReducer.player3.wind,
  );
  const playerLeftWind = useSelector(
    (state: RootState) => state.playersReducer.player4.wind,
  );

  const AITurn = (
    gameTurn: string,
    humanPlayerWind: string,
    playerProps: {
      player: string;
      hand: TTileObject[];
    } | null,
  ) => {
    if (!playerProps || gameTurn === humanPlayerWind) {
      return;
    }
    let tileToDiscard = chooseRandomTile(playerProps.hand);
    let playerX = playerProps?.player;
    console.log('AITURN', playerProps?.player, tileToDiscard?.name);
    discardTile(playerX, tileToDiscard, dispatch);
  };

  const playerProps =
    gameTurn === playerRightWind
      ? {player: 'player2', hand: playerRightHand}
      : gameTurn === playerTopWind
      ? {player: 'player3', hand: playerTopHand}
      : gameTurn === playerLeftWind
      ? {player: 'player4', hand: playerLeftHand}
      : null;

  if (playerProps === null) return null;

  return (
    <Button
      title={'AITURN'}
      onPress={() => AITurn(gameTurn, humanPlayerWind, playerProps)}
    />
  );
};

const PlayerButtonsPanel = () => {
  const dispatch = useDispatch();

  const latestTurn = useSelector(
    (state: RootState) => state.gameReducer.latestPlayerTurn,
  );
  const currentGlobalWind = useSelector(
    (state: RootState) => state.gameReducer.currentTurn,
  );
  const handData = useSelector(
    (state: RootState) => state.playersReducer.player1.playerHand.hand,
  );
  const currentDiscard = useSelector(
    //if unknown null
    (state: RootState) => state.riverReducer.currentDiscard,
  );
  const gamePhase = useSelector(
    (state: RootState) => state.gameReducer.gamePhase,
  );
  const howManyTurnsElapsed = useSelector(
    (state: RootState) => state.gameReducer.howManyTurnsElapsed,
  );
  const nextTile = useSelector((state: RootState) => {
    const tiles = state.wallReducer.tilesAfterHandout;
    return tiles[tiles.length - 1];
  });
  
  const playerWhoLeftTheTile = useSelector(
    (state: RootState) => state.gameReducer.currentPlayer,
  );

  const tilesAfterHandoutLength =  useSelector((state: RootState) => {
    let result =  state.wallReducer.tilesAfterHandout.length
    return result
  });
  const {
    riverReducer: {player1RiverState, player2RiverState, player3RiverState, player4RiverState},
  } = useSelector((state: RootState) => state);
  const {
    playersReducer: {player1, player2, player3, player4},
  } = useSelector((state: RootState) => state);

  const [displayChiiButton, setDisplayChiiButton] = useState<boolean>(false);
  const [displayPonButton, setDisplayPonButton] = useState<boolean>(false);
  const [displayKanButton, setDisplayKanButton] = useState<boolean>(false);
  const [displayRiichiButton, setDisplayRiichiButton] = useState<boolean>(false);

  const [chiiPanelDisplayed, setChiiPanelDisplayed] = useState<boolean>(false);
  const [chiiPanelState, setChiiPanelState] = useState<TTileObject[][]>([]);
  console.log('playersButtonPanel-latestTurn:', latestTurn);

  useEffect(() => {
    console.log(
      'useEffect: runGame():',
      'latestTurn:',
      latestTurn,
      'currentTurn:',
      currentGlobalWind,
      howManyTurnsElapsed,
      currentGlobalWind,
    );
    runGame(
      {player1, player2, player3, player4},
      currentDiscard,
      gamePhase,
      dispatch,
      currentGlobalWind,
      setDisplayPonButton,
      setDisplayChiiButton,
      setDisplayKanButton,
      setDisplayRiichiButton,
      nextTile,
      tilesAfterHandoutLength,
      {player1RiverState, player2RiverState, player3RiverState, player4RiverState}
    );
  }, [currentDiscard]);


  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: 1,
        justifyContent: 'center',
      }}>
      {/*  <ChooseSequencePanel/> */}
      {chiiPanelDisplayed ? <ChooseSequencePanel setChiiPanelDisplayed={setChiiPanelDisplayed} setDisplayChiiButton={setDisplayChiiButton} setDisplayPonButton={setDisplayPonButton} setDisplayKanButton={setDisplayKanButton} chiiPanelState={chiiPanelState} dispatch={dispatch} setChiiPanelState={setChiiPanelState} playerWind={player1.wind} playerWhoLeftTheTile={playerWhoLeftTheTile}/> : null}
      <View
        style={{
          minWidth: 560,
          maxWidth: 600,
          backgroundColor: 'transparent',
          height: 40,
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          columnGap: 8,
        }}>
        <Text>{handData ? handData.length : null}</Text>
        {displayKanButton ? (
          <ButtonKAN handlePress={() => console.log('ButtonKAN')} />
        ) : null}
        {displayPonButton ? (
          <ButtonPON handlePress={() => {console.log('ButtonPON'),handlePon({handData,currentDiscard,playerWhoLeftTheTile,setChiiPanelDisplayed,setDisplayChiiButton,setDisplayKanButton,setDisplayPonButton,setDisplayRiichiButton,dispatch,playerWind: player1.wind})}} />
        ) : null}
        {displayChiiButton ? (
           <ButtonCHII
           handlePress={() => {
             console.log('ButtonCHII');
             handleChii({
               handData,
               currentDiscard,playerWhoLeftTheTile,
               setChiiPanelState,
               setChiiPanelDisplayed,
               setDisplayChiiButton,
               setDisplayPonButton,
               setDisplayKanButton,
               setDisplayRiichiButton,
               dispatch,
               playerWind: player1.wind,
             });
           }}
         />
        ) : null}
        {displayRiichiButton?(
          <ButtonRIICHI handlePress={() => {
             console.log('ButtonRIICHI'),handleRiichi({dispatch,player:player1.name});}}/>
            ):null}
        {displayChiiButton || displayPonButton || displayKanButton ? (
          <ButtonPASS handlePress={() => {console.log('ButtonPASS'),PassActionFunc({setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,setChiiPanelDisplayed,setDisplayRiichiButton,dispatch,displayChiiButton,nextTile})}} />
        ) : null}
        <NextTurn />
      </View>
    </View>
  );
};

export default PlayerButtonsPanel; //WHEN TURN IS INTERRUPTED  discardTile
