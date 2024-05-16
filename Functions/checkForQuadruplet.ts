import { TTileObject } from "../Types/types";

//this function is only for button popUP, stealing will be in seperate function
//so if you press PON button with debounce the proper stealing function will run 

const isPlayerHandContainingFourOfAKind = (playerHand: TTileObject[]) => {
    // Create a frequency map to count occurrences of each tile
    const frequencyMap: { [key: string]: number } = {};
    // Count occurrences of each tile
    playerHand.forEach(tile => {
        const key = `${tile.name}-${tile.type}`; // Assuming tile name and type uniquely identify a tile
        frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    });
    // Check if any tile appears four times
    for (const key in frequencyMap) {
        if (frequencyMap[key] >= 4) {
            return true; // Hand contains four of a kind
        }
    }
};

export  function checkForQuadruplet(playerHand:TTileObject[],discardedTileArray:TTileObject[]){
    let isKan=isPlayerHandContainingFourOfAKind(playerHand)
    if(isKan){return true}
    if (!discardedTileArray || discardedTileArray.length === 0) {
        console.info("NO DISCARDED TILE IN checkForQuadruplet")
        return false;
    } 
    let discardedTile = discardedTileArray[0]
    let discardedTileSuit = discardedTile.type
    const tilesSuits=["bamboo","circles","characters","white","green","red","east","south","west","north"]
    //if it has the same name ex. characters9 or same type for "white","green","red","east","south","west","north"
    //is true
    let isPonPossible = tilesSuits.indexOf(discardedTileSuit) 
    if(isPonPossible===-1)return false //return false
    if(isPonPossible <= 2){
        let suitTiles=playerHand.filter(tile => tile.type === discardedTile.type && tile.name === discardedTile.name)
        if(suitTiles.length==3)return true
        //return //check for characters+ number
    }else{
        let suitTiles=playerHand.filter(t=>t.type===discardedTileSuit)
        //let setOfSuit = new Set()
        if(suitTiles.length==3)return true
    }
return false
}