import { TTileObject } from "../Types/types";

//this function is only for button popUP, stealing will be in seperate function
//so if you press PON button with debounce the proper stealing function will run 
export function checkForTriplet(playerHand:TTileObject[],discardedTileArray:TTileObject[]){
    if (!discardedTileArray || discardedTileArray.length === 0) {
        console.info("NO DISCARDED TILE IN checkForTriplet")
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
        if(suitTiles.length==2)return true
        //return //check for characters+ number
    }else{
        let suitTiles=playerHand.filter(t=>t.type===discardedTileSuit)
        //let setOfSuit = new Set()
        if(suitTiles.length==2)return true
    }
return false
}