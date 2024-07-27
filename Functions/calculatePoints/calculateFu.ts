import { TstolenTiles, TTileObject, WindTypes } from "../../Types/types";
import { countTilesByName } from "../isReadyForRiichii/countTilesByName";
import { calculateWait } from "./calculateWait";




export const calculateFu = (hand: TTileObject[], currentMelds: TstolenTiles[], typeOfWin: 'tsumo' | 'ron',discard: TTileObject[],playersWind:WindTypes, prevailingWind:WindTypes): number => {
    let fu = 20; // Base fu

    //const melds = hand.melds; // Current melds

    const isHandClosed = currentMelds.every(meld => !meld.isOpen);

    //check({ hand, discard, playerMelds: currentMelds })
    let meldedTiles = currentMelds.flatMap(meld => meld.tiles);
    let handToCheck = [...hand, ...discard, ...meldedTiles];
    let discardAndHand = [...discard, ...hand];

    
    const waitType = calculateWait(hand, discard, hand[hand.length - 1]);

    // Winning method adjustments
    if (typeOfWin === 'ron' && isHandClosed) {
      fu += 10; // Closed ron
    } else if (typeOfWin === 'tsumo') {
      fu += 2; // Tsumo
    }
  
    // Waiting form adjustments
    // Waiting form adjustments
    if (waitType === 'middle') {
        fu += 2; // Middle wait
      } else if (waitType === 'edge') {
        fu += 2; // Edge wait
      } else if (waitType === 'pair') {
        fu += 2; // Pair wait
      }
    
    // Value pairs adjustments
    const tileCounts = countTilesByName(handToCheck);
    const valueTiles = ['red', 'green', 'white', prevailingWind, playersWind];
    let valuePairCount = 0;
  
    for (let tileName in tileCounts) {
      const [type] = tileName.split(/(\d+)/).filter(Boolean);
  
      if (valueTiles.includes(type) && tileCounts[tileName] >= 2) {
        valuePairCount++;
        fu += 2; // Dragon pair or Wind pair
      }
    }
  
   
  // Triplets and quads adjustments
  const honorTiles = ['red', 'green', 'white', 'east', 'south', 'west', 'north'];
  for (const meld of currentMelds) {
    if (meld.name === 'Pon' || meld.name === 'Kan') {
      const isClosed = !meld.isOpen;
      let multiplier = meld.name === 'Kan' ? (isClosed ? 16 : 8) : (isClosed ? 4 : 2);
      
    
      const tileName = meld.tiles[0]?.name || ''; 
      const tileType = tileName.split(/(\d+)/)[0] || ''; 
      const tileValueMatch = tileName.match(/\d+/);
      const tileValue = tileValueMatch ? parseInt(tileValueMatch[0], 10) : 0; 
  
      const isHonorTile = honorTiles.includes(tileType);
      const isTerminal = tileValue === 1 || tileValue === 9;
  
      if (isHonorTile || isTerminal) {
        fu += multiplier * 2; // Yaochupai
      } else {
        fu += multiplier; // Chunchanpai
      }
    }
  }


  const tileCountsForClosed = countTilesByName(discardAndHand);

  for (let tileName in tileCountsForClosed) {
    const [type, value] = tileName.split(/(\d+)/).filter(Boolean);
    const isHonorTile = honorTiles.includes(type);
    const isTerminal = value === '1' || value === '9';

    //Pons
    while (tileCountsForClosed[tileName] >= 3) {
      tileCountsForClosed[tileName] -= 3;
      let multiplier = isHonorTile || isTerminal ? 8 : 4;
      fu += multiplier;
    }

    //Kans
    while (tileCountsForClosed[tileName] >= 4) {
      tileCountsForClosed[tileName] -= 4;
      let multiplier = isHonorTile || isTerminal ? 16 : 8;
      fu += multiplier;
    }
  }

    // Round up to the nearest ten
    fu = Math.ceil(fu / 10) * 10;
  
    return fu;
  }