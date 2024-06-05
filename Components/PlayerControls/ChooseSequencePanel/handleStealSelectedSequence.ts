import { CHANGE_ORDER_AFTER_ACTION, INTERRUPT_TURN } from "../../../Store/gameReducer";
import { discardTileFromHand, setStolenTilesOnBoard } from "../../../Store/playersReducer";
import { popFromTheRiver } from "../../../Store/riverReducer";
import { TTileObject, TplayerString, WindTypes } from "../../../Types/types";

type handleStealSelectedSequenceParams = {
    index: number;
    selectedSequence: TTileObject[];
    dispatch: any;
    setChiiPanelState: React.Dispatch<React.SetStateAction<TTileObject[][]>>;
    setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>;
    playerWhoLeftTheTile: TplayerString;
    playerWind: WindTypes;
  };

export const handleStealSelectedSequence = ({index,selectedSequence,dispatch, playerWhoLeftTheTile,
    setChiiPanelState,
    setChiiPanelDisplayed,
    setDisplayChiiButton,
    setDisplayPonButton,
    setDisplayKanButton,
    playerWind,
}:handleStealSelectedSequenceParams) => {
    console.log('handleStealSelectedSequence-selected:',index, selectedSequence.map(i => i.name));
    
    selectedSequence?.forEach(tile => {
      dispatch(discardTileFromHand({player: 'player1', tile: tile}));
    });
    dispatch(
        setStolenTilesOnBoard({
          player: 'player1',
          tilesArray: selectedSequence,
          name: "left",
          isOpen: true,
          type:"Chii"
        }),
      )
      dispatch(popFromTheRiver({player: playerWhoLeftTheTile}));
      dispatch(INTERRUPT_TURN({val: false}));
      dispatch(CHANGE_ORDER_AFTER_ACTION({playerWind:playerWind}))
      //setChiiPanelState
      setDisplayChiiButton(false);
      setDisplayKanButton(false);
      setDisplayPonButton(false);
      setChiiPanelDisplayed(false);
  };