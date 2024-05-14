import { TTileObject } from "../Types/types";
import { END_TURN } from "../Store/gameReducer";
import { discardTileFromHand } from "../Store/handReducer";
import { putTileInTheRiver, setCurrentDiscard } from "../Store/riverReducer";

export const discardTile=(player:string,tile:TTileObject,dispatch:any) =>{
    dispatch(discardTileFromHand({player:player,tile:tile}))
    dispatch(putTileInTheRiver({player:player,tile:tile}))
    dispatch(setCurrentDiscard(tile))
    dispatch(END_TURN());
  }