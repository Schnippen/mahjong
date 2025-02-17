import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {playerToYourLeftWind} from '../Functions/checkPlayersToYourLeftWind';
import {
  GameWinds,
  TTileObject,
  TplayerString,
  WinningHandType,
  YakuType,
  pointsNameType,
} from '../Types/types';

//gamestate
//playerstate
//gamesettings
//turnmanagement

//gameState:

/* gamePhase: Indicates the current phase of the game (e.g., setup, player turn, end game).
currentTurn: Stores information about whose turn it is (e.g., player ID or seat position).
winner: Stores the ID or seat position of the player who wins the game.
round: Tracks the current round number.
deck: Represents the remaining tiles in the deck.
discardPile: Tracks the tiles that have been discarded by players.
lastDiscard: Stores information about the last tile discarded (e.g., suit, rank, player ID). */
type GamePhase = 'started' | 'ended' | 'none';

interface gameState {
  gamePhase: GamePhase;
  currentTurn: GameWinds;
  latestPlayerTurn: GameWinds;
  gameOrder: ['east', 'south', 'west', 'north'];
  startingTurn: number;
  currentTurnIndex: number;
  currentPlayer: TplayerString;
  gameEnded: boolean;
  round: number;
  howManyTurnsElapsed: 0;
  turnInterrupted: boolean; //todo make winnig action better type,
  interrputCounter: number;
  winningHand: WinningHandType;
}

const initialState: gameState = {
  gamePhase: 'none',
  currentTurn: 'east', //wind of player
  latestPlayerTurn: 'east', // player which discarded tile
  gameOrder: ['east', 'south', 'west', 'north'],
  startingTurn: 0,
  currentTurnIndex: 0,
  currentPlayer: 'null',
  howManyTurnsElapsed: 0,
  gameEnded: false,
  round: 0,
  turnInterrupted: false,
  interrputCounter: 0,
  winningHand: {
    hand: [],
    winningTile: [],
    yakuList: [],
    winningAction: '',
    points: 0,
    pointsName: '',
    fu: 0,
    totalHan: 0,
    isRichiiActive: false,
  },
};

export const gameReducer = createSlice({
  name: 'gameReducer',
  initialState,
  reducers: {
    START_GAME: (state, action) => {
      console.log(
        'REDUX START_GAME:',
        state.gamePhase,
        'action:',
        action.payload.phase,
      );
      let {phase} = action.payload;
      state.gamePhase = phase;
    },
    SET_LATEST_TURN: state => {
      state.latestPlayerTurn = state.currentTurn;
    },
    END_TURN: state => {
      const nextIndex = (state.currentTurnIndex + 1) % state.gameOrder.length;

      state.latestPlayerTurn = state.currentTurn;
      state.currentTurnIndex = nextIndex;
      state.currentTurn = state.gameOrder[nextIndex];
      state.howManyTurnsElapsed += 1;
      /*     console.log('END_TURN:', nextIndex, state.latestPlayerTurn,state.currentTurnIndex,state.currentTurn = state.gameOrder[nextIndex],state.howManyTurnsElapsed += 1,"latestTurn:",state.latestPlayerTurn); */
      console.log(
        'REDUX: END_TURN',
        'CURRENT_TURN:',
        state.currentTurn,
        state.currentTurnIndex,
        'latestTurn:',
        state.latestPlayerTurn,
      );

      //currentPlayer: (state.currentPlayer + 1) % 4,
      // actionQueue: [],
    },

    INTERRUPT_TURN: (state, action) => {
      const {val} = action.payload;
      state.turnInterrupted = val;
      if (state.turnInterrupted) {
        console.info('TURN INTERRUPTED:', state.turnInterrupted);
      } else {
        console.log(
          'INTERRUPT_TURN RUNNING, is game interrupted?:',
          state.turnInterrupted,
        );
      }
    },
    CHANGE_ORDER_AFTER_ACTION: (state, action) => {
      //check if this works
      let {playerWind} = action.payload;
      const nextIndex =
        state.gameOrder.indexOf(playerWind) % state.gameOrder.length;
      state.currentTurnIndex = nextIndex;
      state.currentTurn = playerWind;
    },
    setCurrentPlayer: (state, action) => {
      let {current} = action.payload;
      state.currentPlayer = current;
      console.log('REDUX setCurrentPlayer:', state.currentPlayer);
    },
    INTERRUPT_COUNTER: (state, action) => {
      let {TypeOfAction} = action.payload;
      if (TypeOfAction === 'INCREMENT') {
        state.interrputCounter++;
      }
      if (TypeOfAction === 'RESET') {
        state.interrputCounter = 0;
      }
      console.log('REDUX INTERRUPT_COUNTER:', state.interrputCounter);
    },
    setWinningHand: (
      state,
      action: PayloadAction<{
        hand: TTileObject[];
        tile: TTileObject[];
        yaku: YakuType[];
        winAction: 'TSUMO' | 'RON' | '';
        points: number;
        pointsName: pointsNameType;
        fu: number;
        totalHan: number;
        isRichiiActive: boolean;
      }>,
    ) => {
      const {
        hand,
        tile,
        yaku,
        winAction,
        points,
        pointsName,
        fu,
        totalHan,
        isRichiiActive,
      } = action.payload;
      state.winningHand = {
        hand: [...hand],
        winningTile: [...tile],
        yakuList: [...yaku],
        winningAction: winAction,
        points: points,
        pointsName: pointsName,
        fu: fu,
        totalHan: totalHan,
        isRichiiActive: isRichiiActive,
      };
    },
    resetWinningHand_TOTAL: state => {
      state.winningHand = initialState.winningHand;
      console.log('REDUX RESETED WINNING HAND');
    },
    addRoundCounter: (state, action) => {
      let {TypeOfAction} = action.payload;
      if (TypeOfAction === 'increment') {
        state.round++;
      }
      if (TypeOfAction === 'reset') {
        state.round = initialState.round;
      }
    },
    resetGameReducer_TOTAL: state => {
      return {...initialState};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  START_GAME,

  SET_LATEST_TURN,
  END_TURN,
  /*   CHECK_IF_CHII_IS_ON_LEFT_SIDE,
  CHECK_FOR_PON,
  CHECK_FOR_KAN, */
  INTERRUPT_TURN,
  CHANGE_ORDER_AFTER_ACTION,
  setCurrentPlayer,
  setWinningHand,
  resetWinningHand_TOTAL,
  INTERRUPT_COUNTER,
  addRoundCounter,
  resetGameReducer_TOTAL,
} = gameReducer.actions;

export default gameReducer.reducer;
