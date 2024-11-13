import {calculateScore, setRiichi} from '../../Store/playersReducer';
import {setRiichiIndexRiver} from '../../Store/riverReducer';
import {TTileObject, TplayerString} from '../../Types/types';
import {soundFunc} from '../playSounds/soundFunc';

//TODO create correct more universal types
type TPlayerRiver = {riverState: TTileObject[]};

type handleRiichiTypes = {
  dispatch: any;
  player: TplayerString;
  setChiiPanelDisplayed?: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayChiiButton?: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayPonButton?: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayKanButton?: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRiichiButton?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRichiiActive?: React.Dispatch<React.SetStateAction<boolean>>;
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
  river, //river: player1River.riverState,
}: handleRiichiTypes) => {
  //TODO make it more universal
  let riverIndex = river.length;
  console.log(`handleRiichi() of ${player}`, 'riverIndex:', riverIndex);

  dispatch(setRiichi({player: player, val: true}));
  dispatch(calculateScore({player: player, val: -1000}));
  //set unique richii index in river, DONE
  dispatch(setRiichiIndexRiver({player: player, index: riverIndex}));
  //richi index will be displayed in river component DONE
  // change RiverState into object with key of river state and richii index DONE

  //cannot richii if there is less than 4 tiles left

  //player must have at least 1000 points,? check this one out, https://riichi.wiki/Riichi
  //The player must have at least 1,000 points (unless the player is allowed to go into negative points).
  //There must be at least 4 tiles left in the live wall. In other words, the player must be able to draw at least one more tile in an uninterrupted set of turns.
  //TODO check if 4 tiles left, maybe do this in runGame.ts

  //show riichii stick in compass DONE
  //player who used riichii can only discard 14th tile IN PROGRESS

  //when player is in richii buttons should be disabled-  DONE
  //prevents button to appear while in riichi - DONE?
  //also prevent throwing other tiles DONE 
  
  if(player==="player1"){
    setIsRichiiActive?.(true); //this is for player1, boolean allows to only discard new tile from the wall
    setChiiPanelDisplayed?.(false);
    setDisplayChiiButton?.(false);
    setDisplayPonButton?.(false);
    setDisplayKanButton?.(false);
    setDisplayRiichiButton?.(false);
  }
/*   setIsRichiiActive(true); //this is for player1, boolean allows to only discard new tile from the wall
  setChiiPanelDisplayed(false);
  setDisplayChiiButton(false);
  setDisplayPonButton(false);
  setDisplayKanButton(false);
  setDisplayRiichiButton(false); */
  //Audio
  soundFunc({type: 'riichi'});
};
