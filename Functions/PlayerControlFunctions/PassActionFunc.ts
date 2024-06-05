import { END_TURN, INTERRUPT_TURN } from "../../Store/gameReducer"

//TODO dispatch typescript
type PassActionFuncParam={setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,setChiiPanelDisplayed:React.Dispatch<React.SetStateAction<boolean>>,dispatch:any,displayChiiButton:boolean}

export const PassActionFunc = (
    {setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,setChiiPanelDisplayed,dispatch,displayChiiButton}:PassActionFuncParam)=>{
        //TODO typesctipt
        if(displayChiiButton){
            //move to next player
            dispatch(END_TURN());
        }
        setDisplayPonButton(false)
        setDisplayKanButton(false)
        setDisplayChiiButton(false)
        setChiiPanelDisplayed(false)
        dispatch(INTERRUPT_TURN({val:false}))
        
}