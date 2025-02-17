import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
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
import AITurnAutomated from '../../Functions/AI-move/AITurnAutomated';
import {NextTurn} from '../../Functions/AI-move/AIForcedNextTurn';
import {Button} from '@rneui/themed';
import {DebugToolComponent} from '../../Functions/utils/DebugToolComponent';

const PlayerButtonsPanel = ({
  navigation,
  displayRiichiButton,
  setDisplayRiichiButton,
}: {
  navigation: any;
  displayRiichiButton: boolean;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
    wallReducer: {dorasFromDeadWall, uraDorasFromDeadWall},
  } = useSelector((state: RootState) => state);
  const {
    riverReducer: {player1River, player2River, player3River, player4River},
  } = useSelector((state: RootState) => state);
  const {
    playersReducer: {player1, player2, player3, player4},
  } = useSelector((state: RootState) => state);
  const INTERRUPTED_COUNTER = useSelector(
    (state: RootState) => state.gameReducer.interrputCounter,
  );
  const {
    gameReducer: {winningHand},
  } = useSelector((state: RootState) => state);
  const {
    playersReducer: {whoTheWinnerIs},
  } = useSelector((state: RootState) => state);
  const [displayChiiButton, setDisplayChiiButton] = useState<boolean>(false);
  const [displayPonButton, setDisplayPonButton] = useState<boolean>(false);
  const [displayKanButton, setDisplayKanButton] = useState<boolean>(false);
  /*   const [displayRiichiButton, setDisplayRiichiButton] =
    useState<boolean>(false); */
  const [isRichiiActive, setIsRichiiActive] = useState<boolean>(false);
  const [chiiPanelDisplayed, setChiiPanelDisplayed] = useState<boolean>(false);
  const [chiiPanelState, setChiiPanelState] = useState<TTileObject[][]>([]);
  const [displayRonButton, setDisplayRonButton] = useState<boolean>(false);
  const [displayTsumoButton, setDisplayTsumoButton] = useState<boolean>(false);

  useEffect(() => {
    //this might be prone to bugs,
    console.log('AI TEST:', gamePhase, playerWhoLeftTheTile); //i am using player4, beacuse i want player2 to have its turn after player1        let timeoutId;
    let timeoutId: any;
    if (gamePhase === 'started' && playerWhoLeftTheTile !== 'player4') {
      console.info(
        'USE EFFECT() AI:',
        playerWhoLeftTheTile,
        'turnInterrupted:',
        turnInterrupted,
      );
      //here timeout with function AITurnAutomated(dispatch)
      let delayTime = 750;

      if (turnInterrupted === false) {
        timeoutId = setTimeout(
          () => {
            const startPerformance = performance.now();
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
              player1River.riichiIndex,
              player2River.riichiIndex,
              player3River.riichiIndex,
              player4River.riichiIndex,
            );
            const endPerformance = performance.now();
            const executionTime = endPerformance - startPerformance;
            delayTime = executionTime >= 1000 ? executionTime + 250 : 1000;
            console.log(
              '******************************* AITurnAutomated TIME:',
              delayTime / 1000,
              'seconds',
              'executionTime:',
              executionTime / 1000,
            );
          },
          delayTime, //750, // sometimes AITurnAutomated runs longer than 750, maybe add more delay, or variable delay --- Vdelay= AIMove()_time + 250? //EXPERIMENT
          //move it to native module??? for better performance????
        );
      }
    }
    //avoid memory leaks?
    return () => {
      if (timeoutId) {
        //ok now i have better performance, around 250ms saved
        clearTimeout(timeoutId);
      }
    };
  }, [tilesLeftInWall, playerWhoLeftTheTile, INTERRUPTED_COUNTER]);
  useEffect(() => {
    console.info(
      'useEffect: runGame() NEW:',
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
      '~~~~~~~~~How many turns elapsed:',
      howManyTurnsElapsed,
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
      winningHand,
      dorasFromDeadWall,
      uraDorasFromDeadWall,
      whoTheWinnerIs,
      latestTurn,
    );
  }, [currentDiscard]);

  //AUDIO //SOUND
  useEffect(() => {
    if (displayRonButton || displayTsumoButton) {
      //console.log('PLAY SOUND: RON - TSUMO');
      soundFunc({type: 'rontsumoSound'});
    } else if (
      displayChiiButton ||
      displayPonButton ||
      displayKanButton ||
      displayRiichiButton
    ) {
      //console.log('PLAY SOUND: CHII - PON - KAN - RIICHI');
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
  console.log(
    'PlayerButtonsPanel:',
    'displayChii:',
    displayChiiButton,
    'displayPon:',
    displayPonButton,
    'displayKan',
    displayKanButton,
    'displayRon:',
    displayRonButton,
    'displayTsumo:',
    displayTsumoButton,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: 1,
        justifyContent: 'center',
      }}>
      {/* <ChooseSequencePanel/> this is for debugging purposes. However, even with three options available, the logic or panel can display only two.  */}
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
                  nextTile,
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
              /*              dispatch(
                changeWhoTheWinnerIs({
                  TypeOfAction: 'update',
                  valuePlayerName: player1.name,
                  valuePlayerWind: player1.wind,
                }),
              );
              dispatch(
                changeWhoTheLoserIs({
                  TypeOfAction: 'updateRON',
                  valuePlayerName: latestTurn,
                  valuePlayerWind: latestTurn, //wind
                }),
              ); */
              setTimeout(() => {
                navigation.navigate('EndRoundScreen');
                setDisplayRonButton(false);
              }, 500);
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
              /*               dispatch(
                changeWhoTheWinnerIs({
                  TypeOfAction: 'update',
                  valuePlayerName: player1.name,
                  valuePlayerWind: player1.wind,
                }),
              );
              dispatch(
                changeWhoTheLoserIs({
                  TypeOfAction: 'updateTSUMO',
                  valuePlayerName: player1.name,
                  valuePlayerWind: player1.wind,
                }),
              ); */
              setDisplayTsumoButton(false);
              setTimeout(() => {
                navigation.navigate('EndRoundScreen');
              }, 500);
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
        <DebugToolComponent
          navigation={navigation}
          dispatch={dispatch}
          handData={handData}
        />
      </View>
    </View>
  );
};

export default PlayerButtonsPanel;
