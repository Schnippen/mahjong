import {END_TURN, INTERRUPT_TURN} from '../../Store/gameReducer';
import {drawTileFromWallToHand} from '../../Store/playersReducer';
import {popTileFromtilesAfterHandout} from '../../Store/wallReducer';
import {TTileObject} from '../../Types/types';
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
};
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
}: PassActionFuncParam) => {
  //TODO typesctipt
  if (displayChiiButton) {
    //move to next player
    console.log('PassActionFunc() CHII:-added nextTile to hand of player1');
    dispatch(popTileFromtilesAfterHandout());
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
  }
  if (displayPonButton) {
    //move to next player
    console.log('PassActionFunc() PON:-added nextTile to hand of player1');
    dispatch(popTileFromtilesAfterHandout());
    //check for your turn???
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
  }
  if (displayKanButton) {
    //move to next player
    console.log('PassActionFunc() KAN:-added nextTile to hand of player1');
    dispatch(popTileFromtilesAfterHandout());
    //check for your turn???
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
  }
  //AUDIO
  soundFunc({type: 'popDown'});
  setDisplayPonButton(false);
  setDisplayKanButton(false);
  setDisplayChiiButton(false);
  setChiiPanelDisplayed(false);
  setDisplayRiichiButton(false);
  setDisplayRonButton(false);
  setDisplayTsumoButton(false);
  dispatch(INTERRUPT_TURN({val: false}));
  dispatch(END_TURN());
};
