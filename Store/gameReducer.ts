import {createSlice} from '@reduxjs/toolkit';
import { playerToYourLeftWind } from '../Functions/checkPlayersToYourLeftWind';

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
interface gameState {
  gamePhase: string;
  currentTurn: string;
  latestPlayerTurn:string;
  gameOrder: string[];
  startingTurn:number,
  currentTurnIndex: number;
  currentPlayer:string,
  gameEnded: boolean;
  prevailingWind: string;
  round: number;
  howManyTurnsElapsed: 0;
  turnInterrupted:boolean,
  player1Actions:{CHII:boolean,PON:boolean,KAN:boolean,RON:boolean,TSUMO:boolean};
  player2Actions:{CHII:boolean,PON:boolean,KAN:boolean,RON:boolean,TSUMO:boolean};
  player3Actions:{CHII:boolean,PON:boolean,KAN:boolean,RON:boolean,TSUMO:boolean};
  player4Actions:{CHII:boolean,PON:boolean,KAN:boolean,RON:boolean,TSUMO:boolean};
  
}

const initialState: gameState = {
  gamePhase: 'string',
  currentTurn: 'east', //wind of player
  latestPlayerTurn:"string",// player which discarded tile
  gameOrder: ['east', 'south', 'west', 'north'],
  startingTurn:0,
  currentTurnIndex: 0,
  currentPlayer:"",
  howManyTurnsElapsed: 0,
  gameEnded: false,
  prevailingWind: 'east',
  round: 0,
  turnInterrupted:false,
  player1Actions:{CHII:false,PON:false,KAN:false,RON:false,TSUMO:false},
  player2Actions:{CHII:false,PON:false,KAN:false,RON:false,TSUMO:false},
  player3Actions:{CHII:false,PON:false,KAN:false,RON:false,TSUMO:false},
  player4Actions:{CHII:false,PON:false,KAN:false,RON:false,TSUMO:false},
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
    START_TURN: (state, action) => {

    },
    SET_LATEST_TURN:(state)=>{
      state.latestPlayerTurn=state.currentTurn
    },
    END_TURN: state => {
      const nextIndex = (state.currentTurnIndex + 1) % state.gameOrder.length;
    
      state.latestPlayerTurn=state.currentTurn
      state.currentTurnIndex = nextIndex;
      state.currentTurn = state.gameOrder[nextIndex];
      state.howManyTurnsElapsed += 1;
  /*     console.log('END_TURN:', nextIndex, state.latestPlayerTurn,state.currentTurnIndex,state.currentTurn = state.gameOrder[nextIndex],state.howManyTurnsElapsed += 1,"latestTurn:",state.latestPlayerTurn); */
      console.log('CURRENT_TURN:', state.currentTurn, state.currentTurnIndex,"latestTurn:",state.latestPlayerTurn);

      //currentPlayer: (state.currentPlayer + 1) % 4,
       // actionQueue: [],

    },

    INTERRUPT_TURN: (state,action) => {
      const { val } = action.payload;
      state.turnInterrupted = val;
      if (state.turnInterrupted) {
        console.info("TURN INTERRUPTED:", state.turnInterrupted);
      } else {
        console.log("INTERRUPT_TURN RUNNING, is game interrupted?:", state.turnInterrupted);
      }},
    changePrevailingWind: (state, action) => {
      //state.value += action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderOfPlayingTurns,
  START_TURN,
  SET_LATEST_TURN,
  END_TURN,
/*   CHECK_IF_CHII_IS_ON_LEFT_SIDE,
  CHECK_FOR_PON,
  CHECK_FOR_KAN, */
  INTERRUPT_TURN,
  changePrevailingWind,
} = gameReducer.actions;

export default gameReducer.reducer;
