import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {playerToYourLeftWind} from '../Functions/checkPlayersToYourLeftWind';
import {
  GameWinds,
  TTileObject,
  TplayerString,
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
  latestPlayerTurn: string;
  gameOrder: ['east', 'south', 'west', 'north'];
  startingTurn: number;
  currentTurnIndex: number;
  currentPlayer: TplayerString;
  gameEnded: boolean;
  prevailingWind: GameWinds;
  round: number;
  howManyTurnsElapsed: 0;
  turnInterrupted: boolean; //todo make winnig action better type,
  winningHand: {
    hand: TTileObject[];
    winningTile: TTileObject[];
    yakuList: YakuType[];
    winningAction: 'TSUMO' | 'RON' | '';
    points: number;
    pointsName: pointsNameType;
    fu: number;
    totalHan: number;
    isRichiiActive: boolean;
  };
}

const initialState: gameState = {
  gamePhase: 'none',
  currentTurn: 'east', //wind of player
  latestPlayerTurn: 'string', // player which discarded tile
  gameOrder: ['east', 'south', 'west', 'north'],
  startingTurn: 0,
  currentTurnIndex: 0,
  currentPlayer: 'null',
  howManyTurnsElapsed: 0,
  gameEnded: false,
  prevailingWind: 'east',
  round: 0,
  turnInterrupted: false,
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
    orderOfPlayingTurns: (state, action) => {
      //state.value += 1
      //const player = 'player' + (i + 1);
      //const windIndex = (index + i) % winds.length;
    },
    START_GAME: (state, action) => {
      let {phase} = action.payload;
      state.gamePhase = phase;
    },
    START_TURN: (state, action) => {},
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
    changePrevailingWind: (state, action) => {
      //state.value += action.payload
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
    resetWinningHand: state => {
      state.winningHand = {
        hand: [],
        winningTile: [],
        yakuList: [],
        winningAction: '',
        points: 0,
        pointsName: '',
        fu: 0,
        totalHan: 0,
        isRichiiActive: false,
      };
      console.log('REDUX RESETED WINNING HAND');
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderOfPlayingTurns,
  START_GAME,
  START_TURN,
  SET_LATEST_TURN,
  END_TURN,
  /*   CHECK_IF_CHII_IS_ON_LEFT_SIDE,
  CHECK_FOR_PON,
  CHECK_FOR_KAN, */
  INTERRUPT_TURN,
  CHANGE_ORDER_AFTER_ACTION,
  setCurrentPlayer,
  changePrevailingWind,
  setWinningHand,
  resetWinningHand,
} = gameReducer.actions;

export default gameReducer.reducer;
