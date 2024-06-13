import {TTileObject} from '../Types/types';
import {END_TURN} from '../Store/gameReducer';
import {putTileInTheRiver, setCurrentDiscard} from '../Store/riverReducer';
import {popTileFromTheWall} from '../Store/wallReducer';
import {discardTileFromHand} from '../Store/playersReducer';
import { soundFunc } from './playSounds/soundFunc';

export const discardTile = (
  player: string,
  tile: TTileObject,
  dispatch: any,
) => {
  dispatch(discardTileFromHand({player: player, tile: tile}));
  dispatch(putTileInTheRiver({player: player, tile: tile}));
  dispatch(setCurrentDiscard(tile));
  //AUDIO //SOUND
  soundFunc({type:'tileClickSound'})
  //dispatch(END_TURN());
  //dispatch(popTileFromTheWall()); // i wonder if this action is always the case
  //TODO move this dispatch to other function stage
};

//first take from the wall then popTileFromTheWall
//this action will be INTERRUPETED
