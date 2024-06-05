import { TTileObject, TstolenTiles } from "../../Types/types";
import { isTenpai } from "./isTenpai";

type canRichiiTypes={
  hand: TTileObject[],
  player1Melds: TstolenTiles[],
  player2Melds: TstolenTiles[],
  player3Melds: TstolenTiles[],
  player4Melds: TstolenTiles[],
  player1RiverState: TTileObject[],
  player2RiverState: TTileObject[],
  player3RiverState: TTileObject[],
  player4RiverState: TTileObject[],
}

export function canRiichi({hand, player1Melds,player2Melds,player3Melds,player4Melds,player1RiverState,
  player2RiverState,
  player3RiverState,
  player4RiverState,}:canRichiiTypes) {
    return isTenpai({hand,player1Melds,player2Melds,player3Melds,player4Melds,player1RiverState,
      player2RiverState,
      player3RiverState,
      player4RiverState,});
  }