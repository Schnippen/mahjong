import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TTileObject } from '../Types/types'

interface RiverState {
    player1RiverState: TTileObject[],
    player2RiverState: TTileObject[],
    player3RiverState: TTileObject[],
    player4RiverState: TTileObject[],
    currentDiscard:TTileObject[],}

const initialState: RiverState = {
    player1RiverState: [],
    player2RiverState: [],
    player3RiverState: [],
    player4RiverState: [],
    currentDiscard:[],}

console.log("currentDiscard",initialState.currentDiscard)

export const riverReducer = createSlice({
  name: 'riverReducer',
  initialState,
  reducers: {
    putTileInTheRiver: (state, action: PayloadAction<{ player: string; tile: TTileObject }>) => {
      const { player, tile } = action.payload;
      switch (player) {
        case 'player1':
          state.player1RiverState.push(tile);
          break;
        case 'player2':
          state.player2RiverState.push(tile);
          break;
        case 'player3':
          state.player3RiverState.push(tile);
          break;
        case 'player4':
          state.player4RiverState.push(tile);
          break;
        default:
          break;
      }
    },
    setCurrentDiscard: (state,action) => {
      const tile = action.payload
      if(state.currentDiscard.length>0){
        state.currentDiscard.pop()
      }
      state.currentDiscard.push(tile)
    },
    setCurrentDiscardToDefault: (state, action) => {
      const tile = action.payload
      state.currentDiscard = state.currentDiscard.filter(t => t.tileID !== tile.tileID);
    },
    popFromTheRiver:(state,action)=>{
      const { player } = action.payload;
      switch (player) {
        case 'player1':
          state.player1RiverState.pop();
          break;
        case 'player2':
          state.player2RiverState.pop();
          break;
        case 'player3':
          state.player3RiverState.pop();
          break;
        case 'player4':
          state.player4RiverState.pop();
          break;
        default:
          break;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { putTileInTheRiver, setCurrentDiscard, setCurrentDiscardToDefault,popFromTheRiver } = riverReducer.actions

export default riverReducer.reducer