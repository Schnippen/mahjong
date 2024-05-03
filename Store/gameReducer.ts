import {createSlice} from '@reduxjs/toolkit';

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

//player:Andy Bob Charlie Dylan
interface gameState {
  gamePhase: string;
  currentTurn: string;
  gameOrder: string[];
  currentTurnIndex: number;
  gameEnded: boolean;
  prevailingWind: string;
  round: number;
  howManyTurnsElapsed: 0;
}

const initialState: gameState = {
  gamePhase: 'string',
  currentTurn: 'east', //wind of player
  gameOrder: ['east', 'south', 'west', 'north'],
  currentTurnIndex: 0,
  howManyTurnsElapsed: 0,
  gameEnded: false,
  prevailingWind: 'east',
  round: 0,
};

export const gameReducer = createSlice({
  name: 'gameReducer',
  initialState,
  reducers: {
    orderOfPlayingTurns: (state, action) => {
      //state.value += 1
    },
    START_TURN: (state, action) => {
      //state.value += action.payload
    },
    END_TURN: state => {
      const nextIndex = (state.currentTurnIndex + 1) % state.gameOrder.length;
      state.currentTurnIndex = nextIndex;
      state.currentTurn = state.gameOrder[nextIndex];
      state.howManyTurnsElapsed += 1;
      console.log('currentTurn:', state.currentTurn, state.currentTurnIndex);
    },
    INTERRUPT_TURN: (state, action) => {
      //state.value += action.payload
    },
    changePrevailingWind: (state, action) => {
      //state.value += action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderOfPlayingTurns,
  START_TURN,
  END_TURN,
  INTERRUPT_TURN,
  changePrevailingWind,
} = gameReducer.actions;

export default gameReducer.reducer;
