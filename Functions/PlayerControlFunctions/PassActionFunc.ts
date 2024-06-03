import { INTERRUPT_TURN } from "../../Store/gameReducer"

export const PassActionFunc = (
    {setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,setChiiPanelDisplayed,dispatch}:{setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,setChiiPanelDisplayed:React.Dispatch<React.SetStateAction<boolean>>,dispatch:any})=>{
        //TODO typesctipt
        setDisplayPonButton(false)
        setDisplayKanButton(false)
        setDisplayChiiButton(false)
        setChiiPanelDisplayed(false)
        dispatch(INTERRUPT_TURN({val:false}))
}