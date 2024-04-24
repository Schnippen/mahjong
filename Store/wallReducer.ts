import { createSlice } from '@reduxjs/toolkit'

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
interface wallState {
  tilesLeft:number
  tilesLeftInWall:number
  diceRoll:number
}

const initialState: wallState = {
  tilesLeft:136,
  tilesLeftInWall:1,
  diceRoll:0,
}

export const wallReducer = createSlice({
  name: 'wallReducer',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      //state.value += 1
    },
    rollDice:(state)=>{
        state.diceRoll = Math.floor(Math.random() * 12) + 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment,rollDice } = wallReducer.actions

export default wallReducer.reducer