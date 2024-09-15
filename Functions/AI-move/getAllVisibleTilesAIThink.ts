import { TTileObject, TstolenTiles } from "../../Types/types"
import { tilesData as AllTiles } from "../../Data/tilesData";
//https://riichimahjong.net/blog/mahjongai/  good reading
type getAllPossibleTilesTypes ={
    hand:TTileObject[]
    player1Melds:TstolenTiles[]
    player2Melds:TstolenTiles[]
    player3Melds:TstolenTiles[]
    player4Melds:TstolenTiles[]
    player1RiverState:TTileObject[]
    player2RiverState:TTileObject[]
    player3RiverState:TTileObject[]
    player4RiverState:TTileObject[]
}

export function getAllVisibleTilesAIThink({hand,player1Melds,player2Melds,player3Melds,player4Melds,player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,}:getAllPossibleTilesTypes) {
   
    let array:Array<number> = [];

    [player1Melds, player2Melds, player3Melds, player4Melds].forEach(melds => {
      if (melds) {
        array.push(...melds.flatMap(i => i.tiles.map(j => j.tileID)));
      }
    });

    [player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,].forEach(rivers=>{ if(rivers){
        array.push(...rivers.map(t=>t.tileID));
    }})

    if(hand){
    array.push(...hand.map(t=>t.tileID))
    }
    
    let visibleTilesIDs = array.flat();
    let visibleTiles = AllTiles.filter(tile => visibleTilesIDs.includes(tile.tileID));
    //console.log("getAllVisibleTilesAIThink():", possibleTiles.length,"possibleTiles left" , "melds:", meldTileIDs);
    
    return {visibleTiles};
  }
