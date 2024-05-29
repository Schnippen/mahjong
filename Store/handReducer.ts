import {createSlice} from '@reduxjs/toolkit';
import {TTileObject, TstolenTiles} from '../Types/types';
import { WritableDraft } from 'immer';

export interface handState {
  player1Hand: {hand:TTileObject[],melds:TstolenTiles[]};
  player2Hand: {hand:TTileObject[],melds:TstolenTiles[]};
  player3Hand: {hand:TTileObject[],melds:TstolenTiles[]};
  player4Hand: {hand:TTileObject[],melds:TstolenTiles[]};
}
//{name:string,tiles:TTileObject[],isOpen:boolean,}
//{name:"string",tiles:[],isOpen:false}
const initialState: handState = {
  player1Hand: {hand:[],melds:[]},
  player2Hand: {hand:[],melds:[]},
  player3Hand: {hand:[],melds:[]},
  player4Hand: {hand:[],melds:[]},
};

export const handReducer = createSlice({
  name: 'handReducer',
  initialState,
  reducers: {
 
    setStolenTilesOnBoard: (state, action) => {
      const {player, tilesArray, name, isOpen} = action.payload;
      const newStolenTiles = {name, tiles: tilesArray, isOpen};
      if (player === 'player1') {
        state.player1Hand.melds.push(newStolenTiles);
      } else if (player === 'player2') {
        state.player2Hand.melds.push(newStolenTiles);
      } else if (player === 'player3') {
        state.player3Hand.melds.push(newStolenTiles);
      } else if (player === 'player4') {
        state.player4Hand.melds.push(newStolenTiles);
      }
    },
    drawTileFromWallToHand: (state, action) => {
      const {player, nextTile} = action.payload;
      if (player === 'player1') {
        console.log('addTileFromWallToHand() RUNS:', nextTile.name);
        state.player1Hand.hand.push(nextTile);
      } else if (player === 'player2') {
        state.player2Hand.melds.push(nextTile);
      } else if (player === 'player3') {
        state.player3Hand.melds.push(nextTile);
      } else if (player === 'player4') {
        state.player4Hand.melds.push(nextTile);
      }
    },
  },
});
export const {
  setStolenTilesOnBoard,
  drawTileFromWallToHand,
} = handReducer.actions;

export default handReducer.reducer;