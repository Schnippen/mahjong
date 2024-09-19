import {
  discardTileFromHand,
  setStolenTilesOnBoard,
} from '../../Store/playersReducer';
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
  setDisplayChiiButton(false);
  setDisplayKanButton(false);
  setDisplayPonButton(false);
  setChiiPanelDisplayed(false);
  setDisplayRiichiButton(false);
  //AUDIO
  soundFunc({type: 'kan'});
  const end = performance.now();
  console.log(`handleKan() took ${end - start} milliseconds.`);
};
