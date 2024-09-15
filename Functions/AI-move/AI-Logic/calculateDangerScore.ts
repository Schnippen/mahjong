import { tileCountsType, TTileObject } from "../../../Types/types";
import { countTilesByName } from "../../isReadyForRiichii/countTilesByName";


function isPotentialComplete(tile: TTileObject, discardedTile: TTileObject, visibleTileCounts: tileCountsType): boolean
 { 
  const tileName = tile.name
   const discardedTileName = discardedTile.name; 
  
  const [type, value] = discardedTileName.split(/(\d+)/).filter(Boolean);
   if (type && value) { const nextValue1 = `${type}${parseInt(value) + 1}`; 
   const nextValue2 = `${type}${parseInt(value) + 2}`; 
  if (visibleTileCounts[nextValue1] > 0 && visibleTileCounts[nextValue2] > 0) 
    { return true; 
      } }

        if (visibleTileCounts[discardedTileName] >= 2)
           { return true;            } 
  return false; 
}
  
    

export function calculateDangerScore( tile: TTileObject, possibleTiles: TTileObject[], visibleTiles: TTileObject[] ): number {
   
    const visibleTileCounts = countTilesByName(visibleTiles); 
    let dangerScore = 0; 
     possibleTiles.forEach((possibleTile) => { if (isPotentialComplete(possibleTile, tile, visibleTileCounts))
       { dangerScore += 10; 
      // arbitrary value; 
      } }); 
      return dangerScore; }
