import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TTileObject} from '../Types/types';

export interface RiverState {
  player1River: {riverState: TTileObject[]; riichiIndex: number | null};
  player2River: {riverState: TTileObject[]; riichiIndex: number | null};
  player3River: {riverState: TTileObject[]; riichiIndex: number | null};
  player4River: {riverState: TTileObject[]; riichiIndex: number | null};
  currentDiscard: TTileObject[];
}

const initialState: RiverState = {
  player1River: {riverState: [], riichiIndex: null},
  player2River: {riverState: [], riichiIndex: null},
  player3River: {riverState: [], riichiIndex: null},
  player4River: {riverState: [], riichiIndex: null},
  currentDiscard: [],
};

console.log('currentDiscard', initialState.currentDiscard);

export const riverReducer = createSlice({
  name: 'riverReducer',
  initialState,
  reducers: {
    putTileInTheRiver: (
      state,
      action: PayloadAction<{player: string; tile: TTileObject}>,
    ) => {
      const {player, tile} = action.payload;
      switch (player) {
        case 'player1':
          state.player1River.riverState.push(tile);
          break;
        case 'player2':
          state.player2River.riverState.push(tile);
          break;
        case 'player3':
          state.player3River.riverState.push(tile);
          break;
        case 'player4':
          state.player4River.riverState.push(tile);
          break;
        default:
          break;
      }
    },
    setCurrentDiscard: (state, action) => {
      const tile = action.payload;
      if (state.currentDiscard.length > 0) {
        state.currentDiscard.pop();
      }
      state.currentDiscard.push(tile);
    },
    setCurrentDiscardToDefault: (state, action) => {
      const tile = action.payload;
      state.currentDiscard = state.currentDiscard.filter(
        t => t.tileID !== tile.tileID,
      );
    },
    popFromTheRiver: (state, action) => {
      const {player} = action.payload;
      switch (player) {
        case 'player1':
          state.player1River.riverState.pop();
          break;
        case 'player2':
          state.player2River.riverState.pop();
          break;
        case 'player3':
          state.player3River.riverState.pop();
          break;
        case 'player4':
          state.player4River.riverState.pop();
          break;
        default:
          break;
      }
    },
    setRiichiIndexRiver: (state, action) => {
      const {player, index} = action.payload;
      switch (player) {
        case 'player1':
          state.player1River.riichiIndex = index;
          break;
        case 'player2':
          state.player2River.riichiIndex = index;
          break;
        case 'player3':
          state.player3River.riichiIndex = index;
          break;
        case 'player4':
          state.player4River.riichiIndex = index;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  putTileInTheRiver,
  setCurrentDiscard,
  setCurrentDiscardToDefault,
  popFromTheRiver,
  setRiichiIndexRiver,
} = riverReducer.actions;

export default riverReducer.reducer;
