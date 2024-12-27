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
  //TODO: Fix issue where the player is in Tenpai, and the turn is interrupted.In this scenario, the Riichi check is not executed. Ensure that after passing an action, a Riichi check is performed. This issue may occur specifically during a Chii action, but to the best of my knowledge, it is an edge case.
  let edgeCase = false;
  if (displayChiiButton) {
    //move to next player
    console.log('PassActionFunc() CHII:-added nextTile to hand of player1');
    dispatch(popTileFromtilesAfterHandout());
    dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
    //TODO check for riichi....
    let checkingIfPlayer1CanRiichiAfterInterruption = canRiichi({
      hand: player1Hand,
      player1Melds: player1Melds,
      player2Melds: player2Melds,
      player3Melds: player3Melds,
      player4Melds: player4Melds,
      player1RiverState: player1RiverState,
      player2RiverState: player2RiverState,
      player3RiverState: player3RiverState,
      player4RiverState: player4RiverState,
      nextTile,
    }).result;
    console.log(
      `PassActionFunc() CHII:checkingIfPlayer1CanRiichiAfterInterruption ${checkingIfPlayer1CanRiichiAfterInterruption}`,
    );

    if (checkingIfPlayer1CanRiichiAfterInterruption) {
      console.log(
        `PassActionFunc() CHII: FIRST CONDITIONAL: ${player1RiichiIndex}`,
      );
      if (player1RiichiIndex !== null) {
        console.log(`PassActionFunc() CHII: player1RiichiIndex !== null`);
        //setDisplayRiichiButton(false);
        edgeCase = false;
      } else {
        console.log(`PassActionFunc() CHII: ELSE`);
        //setDisplayRiichiButton(true);
        edgeCase = true;
      }
    }
  }
  if (displayPonButton) {
    dispatch(popTileFromtilesAfterHandout());
    if (playerWhoLeftTheTile === 'player2') {
      console.log(
        `PassActionFunc() PON:-added nextTile to hand of player3`,
        playerWhoLeftTheTile,
      );
      dispatch(INTERRUPT_COUNTER({TypeOfAction: 'INCREMENT'}));
      dispatch(drawTileFromWallToHand({player: 'player3', nextTile: nextTile}));
    }
    if (playerWhoLeftTheTile === 'player3') {
      console.log(
        `PassActionFunc() PON:-added nextTile to hand of player4`,
        playerWhoLeftTheTile,
      );
      dispatch(INTERRUPT_COUNTER({TypeOfAction: 'INCREMENT'}));
      dispatch(drawTileFromWallToHand({player: 'player4', nextTile: nextTile}));
    }
    if (playerWhoLeftTheTile === 'player4') {
      console.log(
        `PassActionFunc() PON:-added nextTile to hand of player1`,
        playerWhoLeftTheTile,
      );
      dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile}));
    }
  }
  if (displayKanButton) {
    dispatch(popTileFromtilesAfterHandout());
    if (playerWhoLeftTheTile === 'player2') {
      console.log(
        `PassActionFunc() PON:-added nextTile to hand of player3`,
        playerWhoLeftTheTile,
      );

      dispatch(INTERRUPT_COUNTER({TypeOfAction: 'INCREMENT'}));
      dispatch(drawTileFromWallToHand({player: 'player3', nextTile: nextTile}));
    }
    if (playerWhoLeftTheTile === 'player3') {
      console.log(
        `PassActionFunc() PON:-added nextTile to hand of player4`,
        playerWhoLeftTheTile,
      );
      dispatch(INTERRUPT_COUNTER({TypeOfAction: 'INCREMENT'}));
      dispatch(drawTileFromWallToHand({player: 'player4', nextTile: nextTile}));
    }
    if (playerWhoLeftTheTile === 'player4') {
      console.log(
        'PassActionFunc() KAN:-added nextTile to hand of player1',
        playerWhoLeftTheTile,
      );
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
  if (edgeCase === false) {
    setDisplayRiichiButton(false);
  } else if (edgeCase === true) {
    setDisplayRiichiButton(true);
  }
  //setDisplayRiichiButton(false);//todo when passsing chii
  setDisplayRonButton(false);
  setDisplayTsumoButton(false);
  //LOGIC
  dispatch(INTERRUPT_TURN({val: false}));
  dispatch(END_TURN());
};
