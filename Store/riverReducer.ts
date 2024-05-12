import { createSlice } from '@reduxjs/toolkit'
import { TTileObject } from '../Types/types'

interface RiverState {
    player1RiverState: TTileObject[],
    player2RiverState: TTileObject[],
   
    player3RiverState: TTileObject[],
    player4RiverState: TTileObject[],}

const initialState: RiverState = {
    player1RiverState: [],
    player2RiverState: [],
    player3RiverState: [],
    player4RiverState: [],}

export const riverReducer = createSlice({
  name: 'riverReducer',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
    },
    decrement: (state) => {
    },
    incrementByAmount: (state, action) => {
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = riverReducer.actions

export default riverReducer.reducer