import {
  INTERRUPT_TURN,
  CHANGE_ORDER_AFTER_ACTION,
} from '../../Store/gameReducer';
import {
  discardTileFromHand,
  drawTileFromWallToHand,
  setStolenTilesOnBoard,
} from '../../Store/playersReducer';
import {popFromTheRiver} from '../../Store/riverReducer';
import {setUncoverNextDora} from '../../Store/wallReducer';
import {positionType, TTileObject} from '../../Types/types';
import {stealQuadruplet} from '../StealingFunctions/stealQuadruplet';
import {soundFunc} from '../playSounds/soundFunc';

type HandleKanParam = {
  handData: TTileObject[];
  currentDiscard: TTileObject[];
  playerWhoLeftTheTile: string;
  dispatch: any;
  setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>;
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
  playerWind: string;
  nextTile: TTileObject;
};

export const handleKan = ({
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
  nextTile,
}: HandleKanParam) => {
  const start = performance.now();
  //TODO Shouminkan
  //there is possibility that player declared kan on himself
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

  let {result, kanArray, positionKan} = stealQuadruplet(
    handData,
    currentDiscard,
    position,
  );
  console.log(
    'stealQuadruplet:',
    result,
    kanArray?.map(t => t.name),
  );
  kanArray?.forEach(tile => {
    dispatch(discardTileFromHand({player: 'player1', tile: tile}));
  });
  dispatch(
    setStolenTilesOnBoard({
      player: 'player1',
      tilesArray: kanArray,
      name: positionKan, //positionKan
      isOpen: true,
      type: 'Kan',
    }),
  );
  //uncover next Dora
  dispatch(setUncoverNextDora());
  //27.01.2025 //there was no logic for throwing out tile after declaration
  dispatch(popFromTheRiver({player: playerWhoLeftTheTile}));

  dispatch(INTERRUPT_TURN({val: false}));
  dispatch(CHANGE_ORDER_AFTER_ACTION({playerWind: playerWind}));
  //TODO IMPORTANT, https://riichi.wiki/Kan
  //Otherwise, the last tile from the wall is added to the dead wall, so that the dead wall contains 14 tiles at all times.

  setDisplayChiiButton(false);
  setDisplayKanButton(false);
  setDisplayPonButton(false);
  setChiiPanelDisplayed(false);
  setDisplayRiichiButton(false);

  dispatch(drawTileFromWallToHand({player: 'player1', nextTile: nextTile})); //12.02.2025 //when you will write this code for AI, remember to use nextplayerX instead of 'player1'

  //AUDIO
  soundFunc({type: 'kan'});
  const end = performance.now();
  console.log(`handleKan() took ${(end - start) / 1000} seconds.`);
};
