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
   // Count the occurrences of each visible tile
    const visibleTileCounts = countTilesByName(visibleTiles); 
    // You need to pass the counted tile names 
    let dangerScore = 0; 
    // Check each possible tile to see if discarding the tile would help an opponent complete their hand
     possibleTiles.forEach((possibleTile) => { if (isPotentialComplete(possibleTile, tile, visibleTileCounts))
       { dangerScore += 10; 
      // Arbitrary value; adjust based on desired penalization 
      } }); 
      return dangerScore; }
