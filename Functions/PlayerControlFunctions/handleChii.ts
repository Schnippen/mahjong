import { CHANGE_ORDER_AFTER_ACTION, INTERRUPT_TURN } from "../../Store/gameReducer";
import { setStolenTilesOnBoard } from "../../Store/playersReducer";
import { popFromTheRiver } from "../../Store/riverReducer";
import { TTileObject, TplayerString, WindTypes } from "../../Types/types"
import { checkOrStealSequence } from "../checkOrStealSequence"
import { soundFunc } from "../playSounds/soundFunc";

type HandleChiiParams = {
  handData: TTileObject[];
  currentDiscard: TTileObject[];
  playerWhoLeftTheTile:TplayerString,
  setChiiPanelState: React.Dispatch<React.SetStateAction<TTileObject[][]>>;
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayRiichiButton:React.Dispatch<React.SetStateAction<boolean>>,
  dispatch:any, //TODO typescript
  playerWind:WindTypes,

}
//TODO refactor for AI use
export const handleChii=(
    {  handData,
        currentDiscard,
        playerWhoLeftTheTile,
        setChiiPanelState,
        setChiiPanelDisplayed,
        setDisplayChiiButton,
        setDisplayPonButton,
        setDisplayKanButton,
        setDisplayRiichiButton,
        dispatch,
        playerWind,
      }:HandleChiiParams)=>{
        const start = performance.now();

    let checkS =  checkOrStealSequence(handData,currentDiscard)
    if(checkS.result && checkS.possibleSequences.length===0){
      console.log("handleChii() no chii")
      return
    }
    if(checkS.result && checkS.possibleSequences.length===1){
      checkS.possibleSequences
      console.log(
        'handleChii():',"length:",checkS.possibleSequences.length,
        checkS.possibleSequences.map(i => i.map(t => t.name)),
      );
      let data = checkS.possibleSequences.flat()
      dispatch(
        setStolenTilesOnBoard({
          player: 'player1',
          tilesArray: data,
          name: "left",
          isOpen: true,
          type:"Chii"
        }),
      )
      dispatch(popFromTheRiver({player: playerWhoLeftTheTile}));
      dispatch(INTERRUPT_TURN({val: false}));
      dispatch(CHANGE_ORDER_AFTER_ACTION({playerWind:playerWind}))
      setDisplayChiiButton(false);
      setDisplayKanButton(false);
      setDisplayPonButton(false);
      setChiiPanelDisplayed(false);
      //AUDIO
      soundFunc({type:'chii'})
    }
    if (checkS.result && checkS.possibleSequences.length > 1) {
      console.log(
        'handleStealSequence',
        checkS.possibleSequences.map(i => i.map(t => t.name)),
      );
      setChiiPanelState(checkS.possibleSequences);
      setChiiPanelDisplayed(true);
      //stopDisplayingButtonsIfChiiIsPresent();
      setDisplayPonButton(false)
      setDisplayKanButton(false)
      setDisplayChiiButton(false)
      setDisplayRiichiButton(false)
    }
    const end = performance.now();
    console.log(`handleChii() took ${end - start} milliseconds.`);
  }