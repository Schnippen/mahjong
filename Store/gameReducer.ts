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

//player:Andy Bob Charlie Dylan
interface gameState {
  gamePhase: string;
  currentTurn: string;
  latestPlayerTurn:string;
  gameOrder: string[];
  currentTurnIndex: number;
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
  currentTurnIndex: 0,
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
      //state.value += action.payload
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
      console.log('currentTurn:', state.currentTurn, state.currentTurnIndex,"latestTurn:",state.latestPlayerTurn);
    },
    CHECK_IF_CHII_IS_ON_LEFT_SIDE:(state,action)=>{
      const { playersWind, playerNumber } = action.payload;
      let chiiIsPossible = playerToYourLeftWind(playersWind, state.latestPlayerTurn);
      //console.log("gameReducer CHII:",chiiPossible,playersWind)
      // Update CHII action for the corresponding player based on the calculation
      if (playerNumber === "player1") {
        state.player1Actions.CHII = chiiIsPossible;
      } else if (playerNumber === "player2") {
        state.player2Actions.CHII = chiiIsPossible;
      } else if (playerNumber === "player3") {
        state.player3Actions.CHII = chiiIsPossible;
      } else if (playerNumber === "player4") {
        state.player4Actions.CHII = chiiIsPossible;
      }
    },
    CHECK_FOR_PON:(state,action)=>{
      const { playersWind, playerNumber } = action.payload;
       let ponIsPossible=playersWind!==state.currentTurn //true
       console.log("redux ponIsPossible:",ponIsPossible,playersWind)
       if (playerNumber === "player1") {
        state.player1Actions.PON = ponIsPossible;
      } else if (playerNumber === "player2") {
        state.player2Actions.PON = ponIsPossible;
      } else if (playerNumber === "player3") {
        state.player3Actions.PON = ponIsPossible;
      } else if (playerNumber === "player4") {
        state.player4Actions.PON = ponIsPossible;
      }
    },
    CHECK_FOR_KAN:(state,action)=>{
      const { playersWind, playerNumber } = action.payload;
      let kanIsPossible=true //true
       if (playerNumber === "player1") {
        state.player1Actions.PON = kanIsPossible;
      } else if (playerNumber === "player2") {
        state.player2Actions.PON = kanIsPossible;
      } else if (playerNumber === "player3") {
        state.player3Actions.PON = kanIsPossible;
      } else if (playerNumber === "player4") {
        state.player4Actions.PON = kanIsPossible;
      }
    },
    INTERRUPT_TURN: (state,action) => {
      const { val } = action.payload;
      state.turnInterrupted = val;
      if (state.turnInterrupted) {
        console.error("TURN INTERRUPTED:", state.turnInterrupted);
      } else {
        console.log("INTERRUPT_TURN RUNNING:", state.turnInterrupted);
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
  CHECK_IF_CHII_IS_ON_LEFT_SIDE,
  CHECK_FOR_PON,
  CHECK_FOR_KAN,
  INTERRUPT_TURN,
  changePrevailingWind,
} = gameReducer.actions;

export default gameReducer.reducer;
