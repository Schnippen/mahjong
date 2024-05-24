import {createSlice} from '@reduxjs/toolkit';
import {shuffledTilesForGameStart} from '../Functions/shuffledTilesForGameStart';
import {TTileObject} from '../Types/types';
import {act} from 'react-test-renderer';

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
  currentDiceRoll: number;
  wallTilesArray: any[]; //TODO
  wallEastState: TTileObject[];
  wallSouthState: TTileObject[];
  wallWestState: TTileObject[];
  wallNorthState: TTileObject[];
  tilesAfterHandout: TTileObject[];
  deadWall: TTileObject[];
  dorasFromDeadWall: TTileObject[];
  uncoveredCount: number;
  startTakingFromWallXState:string;
}

const initialState: wallState = {
  tilesLeft: 136,
  tilesLeftInWall: 0,
  currentDiceRoll: 0,
  wallTilesArray: [],
  wallEastState: [],
  wallSouthState: [],
  wallWestState: [],
  wallNorthState: [],
  tilesAfterHandout: [],
  deadWall: [],
  dorasFromDeadWall: [],
  uncoveredCount: 1,
  startTakingFromWallXState:"string",
};

export const wallReducer = createSlice({
  name: 'wallReducer',
  initialState,
  reducers: {
    setDiceRollState: (state, action) => {
      state.currentDiceRoll = action.payload;
    },
    shuffleWallTiles: state => {
      state.wallTilesArray = shuffledTilesForGameStart();
    },
    setWallFragment: (state, action) => {
      const {direction, tiles} = action.payload;
      if (direction === 'east') {
        state.wallEastState = tiles;
      } else if (direction === 'south') {
        state.wallSouthState = tiles;
      } else if (direction === 'west') {
        state.wallWestState = tiles;
      } else if (direction === 'north') {
        state.wallNorthState = tiles;
      }
    },
    setDeadWallFragment: (state, action) => {
      state.deadWall = action.payload;
    },
    setTilesAfterHandout: (state, action) => {
      state.tilesAfterHandout = action.payload;
      state.tilesLeftInWall = state.tilesAfterHandout.length
    },
    setDorasFromDeadWall: (state, action) => {
      const {tiles} = action.payload;
      state.dorasFromDeadWall = [...state.dorasFromDeadWall, ...tiles];
    },
    incrementUncoveredCount: state => {
      state.uncoveredCount += 1;
    },
    setStartTakingFromWallXState:(state,action)=>{
      const wallName = action.payload
      state.startTakingFromWallXState=wallName
    },
    popTileFromtilesAfterHandout:(state)=>{
      state.tilesAfterHandout.pop()
    },
    popTileFromTheWall:(state)=>{
      let startingWind = state.startTakingFromWallXState
      let windsOrder=["east","north","west","south"]
      let orderIndex =windsOrder.indexOf(startingWind) // 1 
      let wind=windsOrder[orderIndex]
      //TODO make it more elegant  
      state.tilesLeftInWall -= 1
      console.log("POP WORKS",state.tilesLeftInWall, wind,orderIndex)
    switch (wind) {
        case "east":
            if (state.wallEastState.length !== 0) {
                state.wallEastState.pop();
                console.log(" EAST")
            } else {
              console.log(" EAST+++")
                orderIndex += 1;
                state.wallNorthState.pop();
            }
            break;
        case "north":
            if (state.wallNorthState.length !== 0) {
                state.wallNorthState.pop();
                console.log(" NORTH")
            } else {
              console.log(" NORTH+++")
              orderIndex += 1;
              state.wallWestState.pop();
            }
            break;
        case "west":
            if (state.wallWestState.length !== 0) {
                state.wallWestState.pop();
                console.log(" WEST")
            } else {
              console.log(" WEST+++")
              orderIndex += 1;
              state.wallWestState.pop();
            }
            break;
        case "south":
            if (state.wallSouthState.length !== 0) {
                state.wallSouthState.pop();
                console.log(" SOUTH")
            } else {
              console.log(" SOUTH+++")
              orderIndex += 0; 
              state.wallEastState.pop();
            }
            break;
        default:
            break;
    }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setDiceRollState,
  shuffleWallTiles,
  setWallFragment,
  setDeadWallFragment,
  setTilesAfterHandout,
  setDorasFromDeadWall,
  incrementUncoveredCount,
  setStartTakingFromWallXState,
  popTileFromtilesAfterHandout,
  popTileFromTheWall,
} = wallReducer.actions;

export default wallReducer.reducer;
