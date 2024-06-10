import {PlayersState, drawTileFromWallToHand} from '../Store/playersReducer';
import {TTileObject, TstolenTiles} from '../Types/types';
import {checkForQuadruplet} from './checkForQuadruplet';

import {checkForTriplet} from './checkForTriplet';
import {checkForSequence} from './checkForSequence';
import {tilesData} from '../Data/tilesData';
import {END_TURN, INTERRUPT_TURN, setCurrentPlayer} from '../Store/gameReducer';
import {
  popTileFromTheWall,
  popTileFromtilesAfterHandout,
} from '../Store/wallReducer';
import {checkOrStealSequence} from './checkOrStealSequence';
import {RiverState, setCurrentDiscard} from '../Store/riverReducer';
import {getAllPossibleTiles} from './isReadyForRiichii/getAllPossibleTilesNow';
import {canRiichi} from './isReadyForRiichii/canRichii';
import {isWinning} from './isWinning/isWinning';

type TPlayers = Omit<PlayersState, 'assignHandsBasedOnWind'>;
type GamePhase = 'started' | 'ended' | 'none';
type GameWinds = 'east' | 'south' | 'west' | 'north';
type TRiver = Omit<RiverState, 'currentDiscard'>;
export const runGame = (
  {player1, player2, player3, player4}: TPlayers,
  currentDiscard: TTileObject[],
  gamePhase: GamePhase,
  dispatch: any, //TODO typescript
  currentGlobalWind: GameWinds,
  setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>,
  nextTile: TTileObject,
  tilesAfterHandoutLength: number,
  {player1River, player2River, player3River, player4River}: TRiver,
) => {
  let mockupData = tilesData.slice(1, 12);
  const start = performance.now();
  //TODO maybe change
  let player1RiverState = player1River.riverState;
  let player2RiverState = player2River.riverState;
  let player3RiverState = player3River.riverState;
  let player4RiverState = player4River.riverState;
  //ustalamy czyja jest tura
  let currentPlayersTurn = '';
  let currentHand = [];
  let nextWind: string = '';
  let nextPlayerX: string = '';
  console.log('runGame() - currentGlobalWind:', currentGlobalWind);
  let playersArray = [player1, player2, player3, player4];
  let interruptTurn: boolean = false;

  if (player1.wind === currentGlobalWind) {
    currentPlayersTurn = 'player1';
  } else if (player2.wind === currentGlobalWind) {
    currentPlayersTurn = 'player2';
  } else if (player3.wind === currentGlobalWind) {
    currentPlayersTurn = 'player3';
  } else if (player4.wind === currentGlobalWind) {
    currentPlayersTurn = 'player4';
  } else console.info('runGame(): none of the players');
  console.log(
    'runGame():',
    currentPlayersTurn,
    'currentDiscard:',
    currentDiscard[0]?.name,
  );

  dispatch(setCurrentPlayer({current: currentPlayersTurn}));

  if (currentPlayersTurn === 'player1') {
    currentHand = player1.playerHand.hand;
  } else if (currentPlayersTurn === 'player2') {
    currentHand = player2.playerHand.hand;
  } else if (currentPlayersTurn === 'player3') {
    currentHand = player3.playerHand.hand;
  } else if (currentPlayersTurn === 'player4') {
    currentHand = player4.playerHand.hand;
  } else {
    return null;
  }

  //The Chii will be checked only for player on the left- ofPlayerX
  //checking if current player has chii possibility
  if (currentGlobalWind === 'east') {
    nextWind = 'south';
  } else if (currentGlobalWind === 'south') {
    nextWind = 'west';
  } else if (currentGlobalWind === 'west') {
    nextWind = 'north';
  } else if (currentGlobalWind === 'north') {
    nextWind = 'east';
  } else console.error('runGame(): none of the nextWind');

  if (player1.wind === nextWind) {
    nextPlayerX = 'player1';
  } else if (player2.wind === nextWind) {
    nextPlayerX = 'player2';
  } else if (player3.wind === nextWind) {
    nextPlayerX = 'player3';
  } else if (player4.wind === nextWind) {
    nextPlayerX = 'player4';
  } else console.info('runGame(): none of the nextPlayerX');

  let handThatHaveSequenceCheck = () => {
    if (nextPlayerX === 'player1') {
      return player1.playerHand.hand;
    } else if (nextPlayerX === 'player2') {
      return player2.playerHand.hand;
    } else if (nextPlayerX === 'player3') {
      return player3.playerHand.hand;
    } else if (nextPlayerX === 'player4') {
      return player4.playerHand.hand;
    } else {
      return mockupData;
    }
  };
  //TODO i can delete checkQ and checkT latet
  let checkQ = checkForQuadruplet(currentHand, currentDiscard);
  let checkT = checkForTriplet(currentHand, currentDiscard);
  let parameterHandThatHaveSequenceCheck = handThatHaveSequenceCheck();
  let checkS;
  //there is a bug with chii, if player passes the chii option, there is no change of current turn
  if (currentPlayersTurn === 'player4') {
    //it will show displays
    console.log(
      'runGame():',
      'checkingForSequunce:',
      'left:',
      currentPlayersTurn,
      'right:',
      nextPlayerX,
    );
    checkS = checkOrStealSequence(
      parameterHandThatHaveSequenceCheck,
      currentDiscard,
    );
    interruptTurn = checkS.result;
    //TODO refactor
    console.log(
      'runGame() possibleSequences:',
      checkS.possibleSequences.map(t => t.map(i => i.name)),
      checkS.possibleSequences.length > 0,
    );
    if (checkS.possibleSequences.length > 0) {
      setDisplayChiiButton(true);
    }
  } else {
    console.log(
      'runGame():',
      'checkingForSequunce:',
      'left:',
      currentPlayersTurn,
      'right:',
      nextPlayerX,
    );
    checkS = checkForSequence(
      parameterHandThatHaveSequenceCheck,
      currentDiscard,
    );
    //TODO make players AI think about it?
    //interruptTurn = checkS.result;
  }

  playersArray.forEach(player => {
    if (currentPlayersTurn === player.name) return;
    const checkT = checkForTriplet(player.playerHand.hand, currentDiscard);
    console.log(`checkForTriplet result for ${player.name}:`, checkT);

    if (checkT) {
      // Show the display for the player
      console.log(`Display for ${player.name}`);
      dispatch(INTERRUPT_TURN({val: true}));
      // Set interruptTurn to true
      interruptTurn = true;
      // Special display if the player is player1
      if (
        player.name === 'player2' ||
        player.name === 'player3' ||
        player.name === 'player4'
      ) {
        // ai makes turn, do pon or passes turn
        const passTime = () => {
          console.log('runGame(): passTime()0.1sec');
          dispatch(INTERRUPT_TURN({val: false}));
          interruptTurn = false;
        };
        //setTimeout(passTime,100)
        dispatch(INTERRUPT_TURN({val: false}));
        interruptTurn = false;
      }
      if (player.name === 'player1') {
        console.log('Special display for player1');
        //display pon and pass panel
        setDisplayPonButton(true);
      }
      ///else setTimeout aiTurn or Pass
    }
  });

  playersArray.forEach(player => {
    let checkQ = checkForQuadruplet(player.playerHand.hand, currentDiscard);
    if (checkQ) {
      //add specific result onl for kan that is on hand contained, it should not pause game
      console.log('runGame(): checkQ');
      console.log(`Display for ${player.name}`);
      dispatch(INTERRUPT_TURN({val: true}));
      interruptTurn = true;

      if (
        player.name === 'player2' ||
        player.name === 'player3' ||
        player.name === 'player4'
      ) {
        // ai makes turn, do pon or passes turn
        const passTime = () => {
          console.log('runGame(): passTime()0.1sec');
          dispatch(INTERRUPT_TURN({val: false}));
          interruptTurn = false;
        };
        //setTimeout(passTime,100)
        dispatch(INTERRUPT_TURN({val: false}));
        interruptTurn = false;
      }
      if (player.name === 'player1') {
        console.log('Special display for player1');
        //display pon and pass panel
        setDisplayKanButton(true);
      }
    }
  });

  //pokazuje z opóźnieniem jednej tury
  console.log(
    currentHand.length,
    currentHand.map(t => t.name),
    currentDiscard[0]?.name,
    'quad?:',
    checkQ,
    'trip?:',
    checkT,
    'currentGlobalWind',
    currentGlobalWind,
    'currentPlayerTurn:',
    currentPlayersTurn,
    'nextWind&nextPlayerX:',
    nextWind,
    nextPlayerX,
    'seq?:',
    checkS.result,
    'interrupted:',
    interruptTurn,
    gamePhase,
  );

  //Rest for each on everyTurn

  let currentPlayers = 'player that has east as a wind makes first move,';

  // as a new instance runGame() again?

  // continue with changing the turn
  //chech for Richii, check for ron check for tsumo
  //check for win
  /* 
  if (currentHand.length >= 14) {
    console.log('runGame(): not adding new tile');
  } */
  //winning conditions should be checked after discarding or drawing tile, so the seperate
  //use effect is needed
  playersArray.forEach(player => {
    if (currentPlayersTurn === player.name) {
      let result = canRiichi({
        hand: currentHand,
        player1Melds: player1.playerHand.melds,
        player2Melds: player2.playerHand.melds,
        player3Melds: player3.playerHand.melds,
        player4Melds: player4.playerHand.melds,
        player1RiverState: player1River.riverState,
        player2RiverState: player2River.riverState,
        player3RiverState: player3River.riverState,
        player4RiverState: player4River.riverState,
      });
      console.log('runGame(): Richii,', player.name, result);
      if (currentPlayersTurn === 'player1' && result) {
        //set show richii, richiiIndex from riverReducer
        if (player1River.riichiIndex !== null) {
          setDisplayRiichiButton(false);
        } else {
          setDisplayRiichiButton(true);
        }
      }
    } else {
      //console.log("runGame(): not my turn for Riichi",player.name)
    }
  });

  playersArray.forEach(player => {
    //run it for all players, and display buttons only for player1
    if (currentPlayersTurn === player.name) {
      console.log('runGame(): isWinning - yaku ,');
      let shit = currentDiscard;
      //check for buttons to be displayed
      /*       isWinning({
        hand: currentHand,
        player1Melds: player1.playerHand.melds,
        player2Melds: player2.playerHand.melds,
        player3Melds: player3.playerHand.melds,
        player4Melds: player4.playerHand.melds,
        discard:currentDiscard,
        currentPlayer:currentPlayersTurn}) */

      //make it manage all players
      //canWin()?
      // show ron
      //show tsumo
      //show noYaku
      //isYaku
      // go to summary screen, calculate winningHand
    }
  });

  //if no tiles check for noten and tempai
  if (tilesAfterHandoutLength === 0) {
    console.info('Game Ended');
    return;
  }

  if (!interruptTurn && gamePhase === 'started') {
    console.log('runGame():', 'END_TURN');
    dispatch(END_TURN());
    dispatch(popTileFromTheWall());
    //todo next tile function
    console.log(
      'runGame():nextTile:',
      nextTile ? nextTile?.name : 'no Next Tile',
    );

    if (currentHand.length >= 14) {
      console.log('runGame(): not adding new tile');
      return;
    }

    dispatch(popTileFromtilesAfterHandout());
    dispatch(drawTileFromWallToHand({player: nextPlayerX, nextTile: nextTile}));
  }
  const end = performance.now();
  console.log(`runGame() took ${end - start} milliseconds.`);
};
