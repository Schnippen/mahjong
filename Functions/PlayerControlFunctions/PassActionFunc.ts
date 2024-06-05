import { END_TURN, INTERRUPT_TURN } from "../../Store/gameReducer"
import { drawTileFromWallToHand } from "../../Store/playersReducer"
import { popTileFromtilesAfterHandout } from "../../Store/wallReducer"
import { TTileObject } from "../../Types/types"

//TODO dispatch typescript
type PassActionFuncParam={setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,setChiiPanelDisplayed:React.Dispatch<React.SetStateAction<boolean>>,setDisplayRiichiButton:React.Dispatch<React.SetStateAction<boolean>>,dispatch:any,displayChiiButton:boolean,nextTile:TTileObject}

export const PassActionFunc = (
    {setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,setChiiPanelDisplayed,setDisplayRiichiButton,dispatch,displayChiiButton,nextTile}:PassActionFuncParam)=>{
        //TODO typesctipt
         if(displayChiiButton){
            //move to next player
            console.log("PassActionFunc():-added nextTile to hand of player1")
            dispatch(popTileFromtilesAfterHandout())
            dispatch(drawTileFromWallToHand({player:'player1',nextTile:nextTile}))
        }
        setDisplayPonButton(false)
        setDisplayKanButton(false)
        setDisplayChiiButton(false)
        setChiiPanelDisplayed(false)
        setDisplayRiichiButton(false)
        dispatch(INTERRUPT_TURN({val:false}))
        dispatch(END_TURN())
        
}