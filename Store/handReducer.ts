import { createSlice } from '@reduxjs/toolkit'
import { TTileObject } from '../Types/types'

interface gameState {
  player1Hand:TTileObject[],
  player2Hand:TTileObject[],
  player3Hand:TTileObject[],
  player4Hand:TTileObject[],
}

const initialState: gameState = {
    player1Hand:[],
    player2Hand:[],
    player3Hand:[],
    player4Hand:[],
}

export const handReducer = createSlice({
  name: 'handReducer',
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
    updateHand: (state, action) => {
        const { player, tile } = action.payload;
        if (player === 'player1') {
            state.player1Hand = [...state.player1Hand, tile]; 
        } else if (player === 'player2') {
            state.player2Hand = [...state.player2Hand, tile];
        } else if (player === 'player3') {
            state.player3Hand = [...state.player3Hand, tile];
        } else if (player === 'player4') {
            state.player4Hand = [...state.player4Hand, tile];
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,updateHand } = handReducer.actions

export default handReducer.reducer