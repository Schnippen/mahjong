import { TTileObject } from "../Types/types";

import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../Store/store';
import { END_TURN } from "../Store/gameReducer";
import { discardTileFromHand } from "../Store/handReducer";
import { putTileInTheRiver } from "../Store/riverReducer";

export const discardTile=(player:string,tile:TTileObject,dispatch:any) =>{
    dispatch(discardTileFromHand({player:player,tile:tile}))
    dispatch(putTileInTheRiver({player:player,tile:tile}))
    dispatch(END_TURN());
  }