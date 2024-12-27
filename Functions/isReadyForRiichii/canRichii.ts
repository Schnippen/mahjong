import {TTileObject, TstolenTiles} from '../../Types/types';
import {isTenpai} from './isTenpai';

type canRichiiTypes = {
  hand: TTileObject[];
  player1Melds: TstolenTiles[];
  player2Melds: TstolenTiles[];
  player3Melds: TstolenTiles[];
  player4Melds: TstolenTiles[];
  player1RiverState: TTileObject[];
  player2RiverState: TTileObject[];
  player3RiverState: TTileObject[];
  player4RiverState: TTileObject[];
  nextTile: TTileObject;
};
//TODO add nextTile ;/
export function canRiichi({
  hand,
  player1Melds,
  player2Melds,
  player3Melds,
  player4Melds,
  player1RiverState,
  player2RiverState,
  player3RiverState,
  player4RiverState,
  nextTile,
}: canRichiiTypes) {
  let result = isTenpai({
    hand,
    player1Melds,
    player2Melds,
    player3Melds,
    player4Melds,
    player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,
    nextTile,
  });
  console.log(`canRiichi.ts -canRiichi()- result:${result}`); //add which tile is necessary to discard
  return result;
}
