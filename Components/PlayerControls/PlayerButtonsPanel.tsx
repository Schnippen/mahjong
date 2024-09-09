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
  ButtonRON,
  ButtonTSUMO,
} from '../Buttons/ButtonSteal/ButtonSteal';
import {Text, View} from 'react-native';
import {runGame} from '../../Functions/runGame';
import {PassActionFunc} from '../../Functions/PlayerControlFunctions/PassActionFunc';
import {handlePon} from '../../Functions/PlayerControlFunctions/handlePon';
import {handleChii} from '../../Functions/PlayerControlFunctions/handleChii';
import ChooseSequencePanel from './ChooseSequencePanel/ChooseSequencePanel';
import {handleRiichi} from '../../Functions/PlayerControlFunctions/handleRiichi';
import {soundFunc} from '../../Functions/playSounds/soundFunc';
import {handleTsumo} from '../../Functions/PlayerControlFunctions/handleTsumo';
import {handleRon} from '../../Functions/PlayerControlFunctions/handleRon';
import {handleKan} from '../../Functions/PlayerControlFunctions/handleKan';
import {testFunction} from '../../Functions/isWinning/Yaku/testFuntion';
import {
  changeWhoTheLoserIs,
  changeWhoTheWinnerIs,
  resetPlayersReducerHandsToNextRound,
} from '../../Store/playersReducer';
import AITurnAutomated from '../../Functions/AI-move/AITurnAutomated';
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
  /* 
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

  if (playerProps === null) return null; */

  return <Button title={'AITURN'} onPress={() => AITurnAutomated(dispatch)} />;
};

const PlayerButtonsPanel = ({navigation}: {navigation: any}) => {
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
  const playerMelds = useSelector(
    (state: RootState) => state.playersReducer.player1.playerHand.melds,
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

  const tilesLeftInWall = useSelector(
    (state: RootState) => state.wallReducer.tilesLeftInWall,
  );

  //console.log('playerWhoLeftTheTile', playerWhoLeftTheTile);
  const tilesAfterHandoutLength = useSelector((state: RootState) => {
    let result = state.wallReducer.tilesAfterHandout.length;
    return result;
  });
  const {
    riverReducer: {player1River, player2River, player3River, player4River},
  } = useSelector((state: RootState) => state);
  const {
    playersReducer: {player1, player2, player3, player4},
  } = useSelector((state: RootState) => state);

  const [displayChiiButton, setDisplayChiiButton] = useState<boolean>(false);
  const [displayPonButton, setDisplayPonButton] = useState<boolean>(false);
  const [displayKanButton, setDisplayKanButton] = useState<boolean>(false);
  const [displayRiichiButton, setDisplayRiichiButton] =
    useState<boolean>(false);
  const [isRichiiActive, setIsRichiiActive] = useState<boolean>(false);
  const [chiiPanelDisplayed, setChiiPanelDisplayed] = useState<boolean>(false);
  const [chiiPanelState, setChiiPanelState] = useState<TTileObject[][]>([]);
  const [displayRonButton, setDisplayRonButton] = useState<boolean>(false);
  const [displayTsumoButton, setDisplayTsumoButton] = useState<boolean>(false);
  //console.log('playersButtonPanel-latestTurn:', latestTurn);

  useEffect(() => {
    //this might be prone to bugs,
    console.log('AI TEST:', gamePhase, playerWhoLeftTheTile); //i am using player4, beacuse i want player2 to have its turn after player1
    if (gamePhase === 'started' && playerWhoLeftTheTile !== 'player4') {
      console.info('AI TURN', playerWhoLeftTheTile);
      //here timeout with function AITurnAutomated(dispatch)
      setTimeout(() => AITurnAutomated(dispatch), 1000);
    }
  }, [tilesLeftInWall, playerWhoLeftTheTile]);
  useEffect(() => {
    console.log(
      'useEffect: runGame():',
      'latestTurn:',
      latestTurn,
      'currentTurn:',
      currentGlobalWind,
      howManyTurnsElapsed,
      currentGlobalWind,
      isRichiiActive,
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
      {
        player1River,
        player2River,
        player3River,
        player4River,
      },
      setDisplayRonButton,
      setDisplayTsumoButton,
      navigation,
    );
  }, [currentDiscard]);

  //AUDIO //SOUND
  useEffect(() => {
    if (displayRonButton || displayTsumoButton) {
      soundFunc({type: 'rontsumoSound'});
    } else if (
      displayChiiButton ||
      displayPonButton ||
      displayKanButton ||
      displayRiichiButton
    ) {
      soundFunc({type: 'meldSound'});
    } else {
      null;
    }
  }, [
    displayChiiButton,
    displayPonButton,
    displayKanButton,
    displayRiichiButton,
    displayRonButton,
    displayTsumoButton,
  ]);

  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: 1,
        justifyContent: 'center',
      }}>
      {/*  <ChooseSequencePanel/> */}
      {chiiPanelDisplayed ? (
        <ChooseSequencePanel
          setChiiPanelDisplayed={setChiiPanelDisplayed}
          setDisplayChiiButton={setDisplayChiiButton}
          setDisplayPonButton={setDisplayPonButton}
          setDisplayKanButton={setDisplayKanButton}
          chiiPanelState={chiiPanelState}
          dispatch={dispatch}
          setChiiPanelState={setChiiPanelState}
          playerWind={player1.wind}
          playerWhoLeftTheTile={playerWhoLeftTheTile}
        />
      ) : null}
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
        {displayKanButton && !isRichiiActive ? (
          <ButtonKAN
            handlePress={() => {
              console.log('ButtonKAN'),
                handleKan({
                  handData,
                  currentDiscard,
                  playerWhoLeftTheTile,
                  setChiiPanelDisplayed,
                  setDisplayChiiButton,
                  setDisplayKanButton,
                  setDisplayPonButton,
                  setDisplayRiichiButton,
                  dispatch,
                  playerWind: player1.wind,
                });
            }}
          />
        ) : null}
        {displayPonButton && !isRichiiActive ? (
          <ButtonPON
            handlePress={() => {
              console.log('ButtonPON'),
                handlePon({
                  handData,
                  currentDiscard,
                  playerWhoLeftTheTile,
                  setChiiPanelDisplayed,
                  setDisplayChiiButton,
                  setDisplayKanButton,
                  setDisplayPonButton,
                  setDisplayRiichiButton,
                  dispatch,
                  playerWind: player1.wind,
                });
            }}
          />
        ) : null}
        {displayChiiButton && !isRichiiActive ? (
          <ButtonCHII
            handlePress={() => {
              console.log('ButtonCHII');
              handleChii({
                handData,
                currentDiscard,
                playerWhoLeftTheTile,
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
        {displayRiichiButton && tilesLeftInWall > 4 ? ( //displayRiichiButton
          <ButtonRIICHI
            handlePress={() => {
              console.log('ButtonRIICHI');
              handleRiichi({
                dispatch,
                player: player1.name,
                setChiiPanelDisplayed,
                setDisplayChiiButton,
                setDisplayPonButton,
                setDisplayKanButton,
                setDisplayRiichiButton,
                setIsRichiiActive,
                river: player1River.riverState,
              });
            }}
          />
        ) : null}
        {displayRonButton ? (
          <ButtonRON
            handlePress={() => {
              console.log('ButtonRON');
              handleRon({
                hand: handData,
                dispatch: dispatch,
                discard: currentDiscard,
                currentMelds: playerMelds,
                winnerWind: player1.wind,
                isRichiiActive: isRichiiActive,
              });
              dispatch(
                changeWhoTheWinnerIs({
                  TypeOfAction: 'update',
                  valuePlayerName: player1.name,
                  valuePlayerWind: player1.wind,
                }),
                changeWhoTheLoserIs({
                  TypeOfAction: 'updateRON',
                  valuePlayerName: latestTurn,
                  valuePlayerWind: latestTurn,
                }),
              );
              setTimeout(() => {
                navigation.navigate('EndRoundScreen');
                setDisplayRonButton(false);
              }, 1500);
            }}
          /> //there also can be pass
        ) : null}
        {displayTsumoButton ? (
          <ButtonTSUMO
            handlePress={() => {
              console.log('ButtonTSUMO');
              handleTsumo({
                hand: handData,
                dispatch: dispatch,
                discard: currentDiscard,
                currentMelds: playerMelds,
                winnerWind: player1.wind,
                isRichiiActive: isRichiiActive,
              });
              dispatch(
                changeWhoTheWinnerIs({
                  TypeOfAction: 'update',
                  valuePlayerName: player1.name,
                  valuePlayerWind: player1.wind,
                }),
                changeWhoTheLoserIs({
                  TypeOfAction: 'updateTSUMO',
                  valuePlayerName: player1.name,
                  valuePlayerWind: player1.wind,
                }),
              );

              setTimeout(() => {
                navigation.navigate('EndRoundScreen');
                setDisplayTsumoButton(false);
              }, 1500);
            }} //there also can be pass
          />
        ) : null}
        {displayChiiButton || displayPonButton || displayKanButton ? (
          <ButtonPASS
            handlePress={() => {
              console.log('ButtonPASS'),
                PassActionFunc({
                  setDisplayChiiButton,
                  setDisplayPonButton,
                  setDisplayKanButton,
                  setChiiPanelDisplayed,
                  setDisplayRiichiButton,
                  dispatch,
                  displayChiiButton,
                  nextTile,
                  setDisplayTsumoButton,
                  setDisplayRonButton,
                  displayKanButton,
                  displayPonButton,
                });
            }}
          />
        ) : null}
        {/* <Button
          title={'testFunction()'}
          onPress={() => {
            testFunction();
            dispatch(resetPlayersReducerHandsToNextRound()); //TODO REMOVE
          }}
        />
        <NextTurn /> */}
      </View>
    </View>
  );
};

export default PlayerButtonsPanel;
