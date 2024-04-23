import { createSlice } from '@reduxjs/toolkit'

interface gameState {
  scoreOfFirstPlayer:number
  scoreOfSecondPlayer:number
  scoreOfThirdPlayer:number
  scoreOfFourthPlayer:number
}

const initialState: gameState = {
  scoreOfFirstPlayer:25000,
  scoreOfSecondPlayer:25000,
  scoreOfThirdPlayer:25000,
  scoreOfFourthPlayer:25000,
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
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = gameReducer.actions

export default gameReducer.reducer