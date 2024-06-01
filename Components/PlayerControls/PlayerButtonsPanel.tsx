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
} from '../Buttons/ButtonSteal/ButtonSteal';

import ChooseSequencePanel, {
  handleDisablePanelButton,
} from './ChooseSequencePanel/ChooseSequencePanel';
import {Text, View} from 'react-native';
import {runGame} from '../../Functions/runGame';

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

  const yourWind = useSelector(
    (state: RootState) => state.playersReducer.player1.wind,
  );
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
    (state: RootState) => state.riverReducer.currentDiscard,
  );
  const gamePhase = useSelector(
    (state: RootState) => state.gameReducer.gamePhase,
  );
  const howManyTurnsElapsed = useSelector(
    (state: RootState) => state.gameReducer.howManyTurnsElapsed,
  );

  const {
    playersReducer: {player1, player2, player3, player4},
  } = useSelector((state: RootState) => state);
  const [displayChiiButton, setDisplayChiiButton] = useState<boolean>(false);
  const [displayPonButton, setDisplayPonButton] = useState<boolean>(false);
  const [displayKanButton, setDisplayKanButton] = useState<boolean>(false);
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
      {chiiPanelDisplayed ? <ChooseSequencePanel /> : null}
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
          <ButtonPON handlePress={() => console.log('ButtonPON')} />
        ) : null}
        {displayChiiButton ? (
          <ButtonCHII handlePress={() => console.log('ButtonCHII')} />
        ) : null}
        {displayChiiButton || displayPonButton || displayKanButton ? (
          <ButtonPASS handlePress={() => console.log('ButtonPASS')} />
        ) : null}
        <NextTurn />
      </View>
    </View>
  );
};

export default PlayerButtonsPanel; //WHEN TURN IS INTERRUPTED  discardTile
