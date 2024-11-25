import {END_TURN, INTERRUPT_COUNTER, INTERRUPT_TURN} from '../../Store/gameReducer';
import {drawTileFromWallToHand} from '../../Store/playersReducer';
import {popTileFromtilesAfterHandout} from '../../Store/wallReducer';
import { TplayerString,  TTileObject} from '../../Types/types';
import {soundFunc} from '../playSounds/soundFunc';

//TODO dispatch typescript
type PassActionFuncParam = {
  setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>;
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: any;
  displayChiiButton: boolean;
  nextTile: TTileObject;
  setDisplayRonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTsumoButton: React.Dispatch<React.SetStateAction<boolean>>;
  displayKanButton: boolean;
  displayPonButton: boolean;
  playerWhoLeftTheTile:TplayerString;
}

//there is a bug whenever pass is pressed i get new tile
export const PassActionFunc = ({
  setDisplayChiiButton,
  setDisplayPonButton,
  setDisplayKanButton,
  setChiiPanelDisplayed,
  setDisplayRiichiButton,
  dispatch,
  displayChiiButton,
  nextTile,
  setDisplayRonButton,
  setDisplayTsumoButton,
  displayPonButton,
  displayKanButton,
  playerWhoLeftTheTile,

}: PassActionFuncParam) => {
  //TODO typesctipt
  if (displayChiiButton) {
    //move to next player
    console.log('PassActionFunc() CHII:-added nextTile to hand of player1');
    dispatch(popTileFromtilesAfterHandout());
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
  }
  if (displayPonButton) {
    dispatch(popTileFromtilesAfterHandout());
    if(playerWhoLeftTheTile === 'player2'){
      console.log(`PassActionFunc() PON:-added nextTile to hand of player3`,playerWhoLeftTheTile);
        dispatch(INTERRUPT_COUNTER({TypeOfAction: "INCREMENT"})) 
        dispatch(drawTileFromWallToHand({player: 'player3', nextTile: nextTile}));
  }
    if(playerWhoLeftTheTile === 'player3'){
      console.log(`PassActionFunc() PON:-added nextTile to hand of player4`,playerWhoLeftTheTile);
         dispatch(INTERRUPT_COUNTER({TypeOfAction: "INCREMENT"})) 
    dispatch(drawTileFromWallToHand({player: 'player4', nextTile: nextTile}));
  }
    if(playerWhoLeftTheTile === 'player4'){
      console.log(`PassActionFunc() PON:-added nextTile to hand of player1`,playerWhoLeftTheTile);
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
  }
  }
  if (displayKanButton) {
    dispatch(popTileFromtilesAfterHandout());
    if(playerWhoLeftTheTile === 'player2'){
      console.log(`PassActionFunc() PON:-added nextTile to hand of player3`,playerWhoLeftTheTile);
      
        dispatch(INTERRUPT_COUNTER({TypeOfAction: "INCREMENT"})) 
        dispatch(drawTileFromWallToHand({player: 'player3', nextTile: nextTile}));
  }
    if(playerWhoLeftTheTile === 'player3'){
      console.log(`PassActionFunc() PON:-added nextTile to hand of player4`,playerWhoLeftTheTile);
         dispatch(INTERRUPT_COUNTER({TypeOfAction: "INCREMENT"})) 
    dispatch(drawTileFromWallToHand({player: 'player4', nextTile: nextTile}));
  }
    if(playerWhoLeftTheTile === 'player4'){
      console.log('PassActionFunc() KAN:-added nextTile to hand of player1',playerWhoLeftTheTile);
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
    }
  }
  //AUDIO
  soundFunc({type: 'popDown'});
  //DISPLAY
  setDisplayPonButton(false);
  setDisplayKanButton(false);
  setDisplayChiiButton(false);
  setChiiPanelDisplayed(false);
  setDisplayRiichiButton(false);
  setDisplayRonButton(false);
  setDisplayTsumoButton(false);
  //LOGIC
  dispatch(INTERRUPT_TURN({val: false}));
  dispatch(END_TURN());
};
