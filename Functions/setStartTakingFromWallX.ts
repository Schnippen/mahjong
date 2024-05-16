import { setStartTakingFromWallXState } from "../Store/wallReducer"

export const setStartTakingFromWallX=(DICE_ROLL:number,dispatch:any)=>{
  const winds ={east:"east",south:"south",west:"west",north:"north"} 
  //["east","south","west","north"]

    if (DICE_ROLL === 2) {
       //zaczyna się od east
       dispatch(setStartTakingFromWallXState(winds.east))
      }
      if (DICE_ROLL === 3) {
        //zaczyna south
        dispatch(setStartTakingFromWallXState(winds.south))
      }
      if (DICE_ROLL === 4) {
      //zaczyna się od west
      dispatch(setStartTakingFromWallXState(winds.west))
      }
      if (DICE_ROLL === 5) {
        // north zaczyna
        dispatch(setStartTakingFromWallXState(winds.north))
      }
      if (DICE_ROLL === 6) {
        //east ma 3 ostatnie tiles
        //zaczuma east
        dispatch(setStartTakingFromWallXState(winds.east))
      }
      if (DICE_ROLL === 7) {
        //south ostatni został tile
        //south zaczyna
        dispatch(setStartTakingFromWallXState(winds.south))
      }
      if (DICE_ROLL === 8) {
       //west pusty
       //zaczyna south
       dispatch(setStartTakingFromWallXState(winds.south))
      }
      if (DICE_ROLL === 9) {
        //north pust
        //zaczyna west
        dispatch(setStartTakingFromWallXState(winds.west))
      } 
      if (DICE_ROLL === 10) {
        // east pusty
        //zaczyna north
        dispatch(setStartTakingFromWallXState(winds.north))
      }
      if (DICE_ROLL === 11) {
        //south pusty
        //zaczyna east
        dispatch(setStartTakingFromWallXState(winds.east))
      }
      if (DICE_ROLL === 12) {
        //west pusty
        //south zaczyna
        dispatch(setStartTakingFromWallXState(winds.south))
      }
      return null
}