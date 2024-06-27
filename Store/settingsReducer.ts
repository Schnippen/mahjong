import {createSlice} from '@reduxjs/toolkit';
import { SettingStoreTypes, VoicesTypes } from '../Types/types';
//TODO if i want to make this multiplayer i have to re think how to display player score
//player:Andy Bob Charlie Dylan
interface SettingsState {
  sortTilesOnHand: boolean;
  showScoreDifference:boolean;
  settings:SettingStoreTypes
}

const initialState: SettingsState = {
  sortTilesOnHand: true,
  showScoreDifference:false,
  settings:{
    sound: true,
    volume: 1,
    voices: 'FEMALE',
    vibrations: true,
    numerals: false,
  }
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
    },
    toggleSounds:(state,actions)=>{
      let active:boolean = actions.payload
      state.settings.sound=active
      //console.log("REDUX - TOOGLE SOUNDS",state.settings.sound)
    },
    setVolume:(state,actions)=>{
      let val:number = actions.payload
      state.settings.volume=val
      //console.log("REDUX - TOOGLE VOLUME",state.settings.volume)
    },
    setVoiceType:(state,action)=>{
      let val:VoicesTypes = action.payload
      state.settings.voices=val
      //console.log("REDUX - VOICE TYPE",state.settings.voices)
    },
    toggleVibrations:(state,action)=>{
      let val:boolean = action.payload
      state.settings.vibrations=val
      //console.log("REDUX - TOGGLE VIBRATIONS",state.settings.vibrations)
    },
    toggleNumerals:(state,action)=>{
      let val:boolean = action.payload
      state.settings.numerals=val
      //console.log("REDUX - TOGGLE NUMERALS",state.settings.numerals)
    }
  },
});

// Action creators are generated for each case reducer function
export const {setSortTileOnHand,setShowScoreDifference,toggleSounds,setVolume,setVoiceType,toggleVibrations,toggleNumerals} = settingsReducer.actions;

export default settingsReducer.reducer;
