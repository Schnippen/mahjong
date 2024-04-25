import {createSlice} from '@reduxjs/toolkit';
import {shuffledTilesForGameStart} from '../Functions/shuffleTilesForGameStart';
import {tileObject} from '../Types/types';

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
//17 -> 34 *4 = 136
//Haiyama = wall
interface wallState {
  tilesLeft: number;
  tilesLeftInWall: number;
  diceRoll: number;
  wallTilesArray: Array<Object>;
  wallEastState: Array<Object>;
  wallSouthState: Array<Object>;
  wallWestState: Array<Object>;
  wallNorthState: Array<Object>;
  deadWall: Array<Object>;
}

const initialState: wallState = {
  tilesLeft: 136,
  tilesLeftInWall: 1,
  diceRoll: 0,
  wallTilesArray: [],
  wallEastState: [],
  wallSouthState: [],
  wallWestState: [],
  wallNorthState: [],
  deadWall: [],
};

export const wallReducer = createSlice({
  name: 'wallReducer',
  initialState,
  reducers: {
    rollDice: state => {
      state.diceRoll = Math.floor(Math.random() * 12) + 1;
    },
    shuffleWallTiles: state => {
      state.wallTilesArray = shuffledTilesForGameStart();
    },
    setWallFragment: (state, action) => {
      const {direction, tiles} = action.payload; // Extract direction and tiles from the action payload
      if (direction === 'east') {
        state.wallEastState = tiles; // Update the wallEastState with the tiles passed in the action payload
      } else if (direction === 'south') {
        state.wallSouthState = tiles;
      } else if (direction === 'west') {
        state.wallWestState = tiles;
      } else if (direction === 'north') {
        state.wallNorthState = tiles;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {rollDice, shuffleWallTiles, setWallFragment} =
  wallReducer.actions;

export default wallReducer.reducer;
