import {createSlice} from '@reduxjs/toolkit';
//TODO if i want to make this multiplayer i have to re think how to display player score
//player:Andy Bob Charlie Dylan
interface SettingsState {
  sortTilesOnHand: boolean;
}

const initialState: SettingsState = {
  sortTilesOnHand: false,
};

export const settingsReducer = createSlice({
  name: 'settingsReducer',
  initialState,
  reducers: {
    setSortTileOnHand: state => {
      state.sortTilesOnHand = !state.sortTilesOnHand;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSortTileOnHand} = settingsReducer.actions;

export default settingsReducer.reducer;
