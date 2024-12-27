import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import {Button} from '@rneui/themed';
import {TTileObject} from '../../Types/types';
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
} from '../../Store/playersReducer';
import AITurnAutomated from '../../Functions/AI-move/AITurnAutomated';

const NextTurn = () => {
  const gameTurn = useSelector(
    (state: RootState) => state.gameReducer.currentTurn,
  );
  const dispatch = useDispatch();
  const {
    playersReducer: {player1, player2, player3, player4},
  } = useSelector((state: RootState) => state);
  const {
    riverReducer: {player1River, player2River, player3River, player4River},
  } = useSelector((state: RootState) => state);
  return (
    <Button
      title={'AITURN'}
      onPress={() =>
        AITurnAutomated(
          dispatch,
          gameTurn,
          player1.wind,
          player2.wind,
          player3.wind,
          player4.wind,
          player2.playerHand.hand,
          player3.playerHand.hand,
          player4.playerHand.hand,
          player1.playerHand.melds,
          player2.playerHand.melds,
          player3.playerHand.melds,
          player4.playerHand.melds,
          player1River.riverState,
          player2River.riverState,
          player3River.riverState,
          player4River.riverState,
        )
      }
      type="outline"
    />
  );
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
  const turnInterrupted = useSelector(
    (state: RootState) => state.gameReducer.turnInterrupted,
  );
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
  const INTERRUPER_COUNTER = useSelector(
    (state: RootState) => state.gameReducer.interrputCounter,
  );

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
      console.info(
        'USE EFFECT() AI:',
        playerWhoLeftTheTile,
        'turnInterrupted:',
        turnInterrupted,
      );
      //here timeout with function AITurnAutomated(dispatch)
      if (turnInterrupted === false) {
        setTimeout(
          () =>
            AITurnAutomated(
              dispatch,
              currentGlobalWind,
              player1.wind,
              player2.wind,
              player3.wind,
              player4.wind,
              player2.playerHand.hand,
              player3.playerHand.hand,
              player4.playerHand.hand,
              player1.playerHand.melds,
              player2.playerHand.melds,
              player3.playerHand.melds,
              player4.playerHand.melds,
              player1River.riverState,
              player2River.riverState,
              player3River.riverState,
              player4River.riverState,
            ),
          750,
        );
      } //problem with bamboo 2 name.... error
    } //TODO bug with turn interrupted
  }, [tilesLeftInWall, playerWhoLeftTheTile, INTERRUPER_COUNTER]);
  useEffect(() => {
    console.info(
      'useEffect: runGame():',
      'latestTurn:',
      latestTurn,
      'currentTurn:',
      currentGlobalWind,
      'howManyTurnsElapsed:',
      howManyTurnsElapsed,
      'currentGlobalWind:',
      currentGlobalWind,
      'isRichiiActive:',
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
                  playerWhoLeftTheTile,
                  player1Hand: player1.playerHand.hand,
                  player1Melds: player1.playerHand.melds,
                  player2Melds: player2.playerHand.melds,
                  player3Melds: player3.playerHand.melds,
                  player4Melds: player4.playerHand.melds,
                  player1RiverState: player1River.riverState,
                  player2RiverState: player2River.riverState,
                  player3RiverState: player3River.riverState,
                  player4RiverState: player4River.riverState,
                  player1RiichiIndex: player1River.riichiIndex,
                });
            }}
          />
        ) : null}
        <Button
          type="outline"
          title={'testFunction()'}
          onPress={() => {
            testFunction(dispatch);
          }}
        />
        <NextTurn />
      </View>
    </View>
  );
};

export default PlayerButtonsPanel;
