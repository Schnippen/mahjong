import { TTileObject } from "../../Types/types";
import { chooseRandomTile } from "../aiTurn";
import { discardTile } from "../discardTileFunction";

//TODO CHANGE it for standard gameReducer
const AITurn = (
    gameTurn: string,
    humanPlayerWind: string,
    playerProps: {
      player: string;
      hand: TTileObject[];
    } | null,
    dispatch:any //TODO dispatch
  ) => {
 ;
    if (!playerProps || gameTurn === humanPlayerWind) {
      return;
    }
    let tileToDiscard = chooseRandomTile(playerProps.hand);
    let playerX = playerProps?.player;
    console.log('AITURN', playerProps?.player, tileToDiscard?.name);
    discardTile(playerX, tileToDiscard, dispatch);
  };

  export default AITurn