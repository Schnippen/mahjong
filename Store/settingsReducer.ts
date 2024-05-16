import {createSlice} from '@reduxjs/toolkit';
//TODO if i want to make this multiplayer i have to re think how to display player score
//player:Andy Bob Charlie Dylan
interface SettingsState {
  sortTilesOnHand: boolean;
  showScoreDifference:boolean;
}

const initialState: SettingsState = {
  sortTilesOnHand: true,
  showScoreDifference:false,
};

export const settingsReducer = createSlice({
  name: 'settingsReducer',
  initialState,
  reducers: {
    setSortTileOnHand: state => {
      state.sortTilesOnHand = !state.sortTilesOnHand;
    },
    setShowScoreDifference:state=>{
      state.showScoreDifference=!state.showScoreDifference
    }
  },
});

// Action creators are generated for each case reducer function
export const {setSortTileOnHand,setShowScoreDifference} = settingsReducer.actions;

export default settingsReducer.reducer;
