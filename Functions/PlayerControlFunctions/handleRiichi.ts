import {calculatePoints, setRiichi} from '../../Store/playersReducer';
import {setRiichiIndexRiver} from '../../Store/riverReducer';
import {TTileObject, TplayerString} from '../../Types/types';
import { soundFunc } from '../playSounds/soundFunc';

//TODO create correct more universal types
type TPlayerRiver = {riverState: TTileObject[]};

type handleRiichiTypes = {
  dispatch: any;
  player: TplayerString;
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRichiiActive: React.Dispatch<React.SetStateAction<boolean>>;
  river: TTileObject[];
};
//
export const handleRiichi = ({
  dispatch,
  player,
  setChiiPanelDisplayed,
  setDisplayChiiButton,
  setDisplayPonButton,
  setDisplayKanButton,
  setDisplayRiichiButton,
  setIsRichiiActive,
  river,
}: handleRiichiTypes) => {
  //TODO make it more universal
  let riverIndex = river.length;
  console.log('handleRiichi()', 'riverIndex:', riverIndex);

  dispatch(setRiichi({player: player, val: true}));
  dispatch(calculatePoints({player: player, val: -1000}));
  //set unique richii index in river, DONE
  dispatch(setRiichiIndexRiver({player: player, index: riverIndex}));
  //richi index will be displayed in river component DONE
  // change RiverState into object with key of river state and richii index DONE

  //cannot richii if there is less than 4 tiles left

  //player must have at least 1000 points,? check this one out

  //show riichii stick in compass DONE
  //player who used riichii can only discard 14th tile

  //when player is in richii buttons should be disabled
  //prevents button to appear while in riichi //TODO do something with Pass button
  //TODO also prevent throwing other tiles
  setIsRichiiActive(true);

  setChiiPanelDisplayed(false);
  setDisplayChiiButton(false);
  setDisplayPonButton(false);
  setDisplayKanButton(false);
  setDisplayRiichiButton(false);
  //Audio
  soundFunc({type:"riichi"})
};
