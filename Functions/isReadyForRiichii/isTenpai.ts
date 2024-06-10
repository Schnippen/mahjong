import {TTileObject, TstolenTiles} from '../../Types/types';
import {checkMelds} from './checkMelds';
import {countTilesByName} from './countTilesByName';
import {getAllPossibleTiles} from './getAllPossibleTilesNow';
import {checkWinningHand} from './checkingWinningHand';

type IsTenpaiTypes = {
  hand: TTileObject[];
  player1Melds: TstolenTiles[];
  player2Melds: TstolenTiles[];
  player3Melds: TstolenTiles[];
  player4Melds: TstolenTiles[];
  player1RiverState: TTileObject[];
  player2RiverState: TTileObject[];
  player3RiverState: TTileObject[];
  player4RiverState: TTileObject[];
};

export function isTenpai({
  hand,
  player1Melds,
  player2Melds,
  player3Melds,
  player4Melds,
  player1RiverState,
  player2RiverState,
  player3RiverState,
  player4RiverState,
}: IsTenpaiTypes): boolean {
  if (hand.length !== 13) return false;
  // Tenpai requires exactly 13 tiles in hand

  //const tileCounts = countTilesByName(hand);
  // checking all possible tiles that could be drawn to form a winning hand
  for (let possibleTile of getAllPossibleTiles({
    hand,
    player1Melds,
    player2Melds,
    player3Melds,
    player4Melds,
    player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,
  })) {
    const newHand = [...hand, possibleTile];
    if (checkWinningHand(newHand)) {
      return true;
    }
  }

  return false;
}
