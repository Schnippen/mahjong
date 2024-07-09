import { resetWinningHand } from "../Store/gameReducer"
import { resetWallReducer } from "../Store/wallReducer"
import { playPopDownSound } from "./playSounds/Sounds/playPopDownSound"

export const resetToNextRound=({dispatch,navigation}:{dispatch:any,navigation:any})=>{
    playPopDownSound()
    //dispatch
    //reset game reducer
    // hands
    //check who won, change wind accordingly 
    dispatch(resetWinningHand())
    dispatch(resetWallReducer()) //wallreducer to 0 
    ///change compass
    //change score
    //change prevailingWind
    navigation.navigate("MahjongScreen")
    console.log("resetToNextRound pressed")
}