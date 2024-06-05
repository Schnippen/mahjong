import { DisablePanelButtonParams } from "./ChooseSequencePanel";

export const handleDisablePanelButton = ({setChiiPanelDisplayed,setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton}:DisablePanelButtonParams) => {
    console.log("handleDisablePanelButton()")
    setChiiPanelDisplayed(false)
    // set previous state.... 
    setDisplayChiiButton(true);
    setDisplayPonButton(true);
    setDisplayKanButton(true); 
  };