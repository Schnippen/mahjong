import {
  END_TURN,
  INTERRUPT_COUNTER,
  INTERRUPT_TURN,
} from '../../Store/gameReducer';
import {drawTileFromWallToHand} from '../../Store/playersReducer';
import {popTileFromtilesAfterHandout} from '../../Store/wallReducer';
import {
  PassActionFuncParam,
  TplayerString,
  TTileObject,
} from '../../Types/types';
import {canRiichi} from '../isReadyForRiichii/canRichii';
import {soundFunc} from '../playSounds/soundFunc';
//this function logic seems convoluted at first, but it works through many trials,  logic is structured to be read step by step in a declarative manner, prioritizing functionality over aesthetic simplicity.
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
  player1Hand,
  player1Melds,
  player2Melds,
  player3Melds,
  player4Melds,
  player1RiverState,
  player2RiverState,
  player3RiverState,
  player4RiverState,
  player1RiichiIndex,
}: PassActionFuncParam) => {
  let edgeCase = false;
//FIXED When Riichi is possible along with Chii, Pon, or Kan,  
//FIXED clicking "Pass" incorrectly adds 2 new tiles instead of the intended 1 tile.
//this fixes the bug or my previous bad design, handling only one action at a time with priority: Kan > Pon > Chii
  if (displayKanButton) {
    handleKanPonAction('kan');
  } else if (displayPonButton) {
    handleKanPonAction('pon');
  } else if (displayChiiButton) {
    handleChiiAction();
  }

  //AUDIO
  soundFunc({type: 'popDown'});
  //cleanup operations
  resetAllDisplays();
  dispatch(INTERRUPT_TURN({val: false}));
  dispatch(END_TURN());

  function handleKanPonAction(actionType: 'kan' | 'pon') {
    dispatch(popTileFromtilesAfterHandout());
    const targetPlayer = getTargetPlayer();
    if (!targetPlayer) return;

    console.log(`PassActionFunc() ${actionType.toUpperCase()}:-added nextTile to hand of ${targetPlayer}`);
    if (targetPlayer !== 'player1') {
      dispatch(INTERRUPT_COUNTER({TypeOfAction: 'INCREMENT'}));
    }
    dispatch(drawTileFromWallToHand({player: targetPlayer, nextTile}));
  }
  function handleChiiAction() {
    console.log('PassActionFunc() CHII:-added nextTile to hand of player1');
    dispatch(popTileFromtilesAfterHandout());
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile}));
    const canRiichiResult = canRiichi({
      hand: player1Hand,
      player1Melds,
      player2Melds,
      player3Melds,
      player4Melds,
      player1RiverState,
      player2RiverState,
      player3RiverState,
      player4RiverState,
      nextTile,
    }).result;
    console.log(`CHII: Riichi check after interruption: ${canRiichiResult}`);
    edgeCase = player1RiichiIndex === null && canRiichiResult;
  }

  function getTargetPlayer(): TplayerString | null {
    const playerMap: Record<string, TplayerString> = {
      player2: 'player3',
      player3: 'player4',
      player4: 'player1'
    };
    return playerMap[playerWhoLeftTheTile] || null;
  }
  //DISPLAY BUTTONS
  function resetAllDisplays() {
    setDisplayPonButton(false);
    setDisplayKanButton(false);
    setDisplayChiiButton(false);
    setChiiPanelDisplayed(false);
    setDisplayRonButton(false);
    setDisplayTsumoButton(false);
    setDisplayRiichiButton(edgeCase);
  }
};


