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

interface gameState {
  gamePhase:string
  playerTurn:number
  gameEnded:boolean
  prevailingWind:string
  player1Score:number
  player2Score:number
  player3Score:number
  player4Score:number

}

const initialState: gameState = {
  gamePhase:"string",
  playerTurn:1,
  gameEnded:false,
  prevailingWind:"east",
  player1Score:10000,
  player2Score:15000,
  player3Score:20000,
  player4Score:25000,
}

export const gameReducer = createSlice({
  name: 'gameReducer',
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
    decrement: (state) => {
      //state.value -= 1
    },
    incrementByAmount: (state, action) => {
      //state.value += action.payload
    },
    changePrevailingWind: (state, action) => {
      //state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,changePrevailingWind } = gameReducer.actions

export default gameReducer.reducer