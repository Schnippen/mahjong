import {
  CHANGE_ORDER_AFTER_ACTION,
  INTERRUPT_TURN,
} from '../../Store/gameReducer';
import {
  discardTileFromHand,
  setStolenTilesOnBoard,
} from '../../Store/playersReducer';
import {popFromTheRiver} from '../../Store/riverReducer';
import {TTileObject, TplayerString, WindTypes} from '../../Types/types';
import {positionType, stealTriplet} from '../StealingFunctions/stealTriplet';
import { soundFunc } from '../playSounds/soundFunc';

type HandlePonParam = {
  handData: TTileObject[];
  currentDiscard: TTileObject[];
  playerWhoLeftTheTile: TplayerString;
  dispatch: any; //TODO dispatch typescript
  setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>;
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
  playerWind: WindTypes;
};

//TODO dispatch typescript
export const handlePon = ({
  handData,
  currentDiscard,
  playerWhoLeftTheTile,
  dispatch,
  setDisplayChiiButton,
  setDisplayPonButton,
  setDisplayKanButton,
  setDisplayRiichiButton,
  playerWind,
  setChiiPanelDisplayed,
}: HandlePonParam) => {
  const start = performance.now();
  let positionOfPlayerWhoLeftTheTile = (
    playerWhoLeftTheTile: string,
  ): positionType => {
    if (playerWhoLeftTheTile === 'player1') {
      return 'bottom';
    } else if (playerWhoLeftTheTile === 'player2') {
      return 'right';
    } else if (playerWhoLeftTheTile === 'player3') {
      return 'top';
    } else if (playerWhoLeftTheTile === 'player4') {
      return 'left';
    } else {
      return 'bottom';
    }
  };
  const position: positionType =
    positionOfPlayerWhoLeftTheTile(playerWhoLeftTheTile);
  let {result, ponArray} = stealTriplet(handData, currentDiscard, position);
  console.log(
    'stealTriplet:',
    result,
    ponArray?.map(t => t.name),
    'playerPos:',
    position,
  );
  //TODO make it usable for Ai
  ponArray?.forEach(tile => {
    dispatch(discardTileFromHand({player: 'player1', tile: tile}));
  });
  dispatch(
    setStolenTilesOnBoard({
      player: 'player1',
      tilesArray: ponArray,
      name: position,
      isOpen: true,
      type: 'Pon',
    }),
  );
  dispatch(popFromTheRiver({player: playerWhoLeftTheTile}));
  dispatch(INTERRUPT_TURN({val: false}));
  dispatch(CHANGE_ORDER_AFTER_ACTION({playerWind: playerWind}));
  setDisplayChiiButton(false);
  setDisplayKanButton(false);
  setDisplayPonButton(false);
  setChiiPanelDisplayed(false);
  setDisplayRiichiButton(false);
  //AUDIO
  soundFunc({type:'pon'})
  //dispatch(SET_LATEST_TURN());
  //set current turn to the player and he must discard
  const end = performance.now();
  console.log(`handlePon() took ${end - start} milliseconds.`);
};
