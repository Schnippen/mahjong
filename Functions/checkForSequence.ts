import { TTileObject } from "../Types/types"

export function checkForSequence(playerHand:TTileObject[],discardedTileArray:TTileObject[]){
    //must be player on the left side, 
    let discardedTile = discardedTileArray[0]
    let discardedTileSuit = discardedTile.type
    const tilesSuits=["bamboo","circles","characters"]
    let isChiiPossible = tilesSuits.indexOf(discardedTileSuit) //0 else -1 return null
    //checks if there is a chii type tile
    if(isChiiPossible===-1)return null //return false

    let discardedTileValue= Number(discardedTile.value)
    let suitTiles=playerHand.filter(t=>t.type===discardedTileSuit)
    //check if there are tiles for chii
    if(suitTiles.length<2)return null //return false
    suitTiles.sort((a, b) => Number(a.value) -Number(b.value));
    const chiiOptions: TTileObject[][] = [];
    for (let i = 0; i < suitTiles.length - 2; i++) {
        const firstTile = suitTiles[i];
        const secondTile = suitTiles[i + 1];
        const thirdTile = suitTiles[i + 2];
        const option1 = [discardedTile,firstTile, secondTile];//for example Two-3-4
        const option2 = [discardedTile,firstTile, secondTile];//for example Four-2-3
        if (
            (firstTile.value === discardedTileValue - 2 && secondTile.value === discardedTileValue - 1)
        ) {
            //show options component 
            chiiOptions.push.apply(option1);
        }
        if (
            (secondTile.value === discardedTileValue - 1 && thirdTile.value === discardedTileValue + 1)
        ) {
            //show options component
            chiiOptions.push.apply(option2);
        }
        if (
            (firstTile.value === discardedTileValue - 1 && secondTile.value === discardedTileValue + 1)
        ) chiiOptions.push([discardedTile,firstTile,secondTile]);
      }
      //SHOW BUTTON FOR CHII
     // If there's only one possible Chii option, return it
     if (chiiOptions.length === 1) {
        console.warn("Sequence:","First","Discarded","Third",chiiOptions.map(t=>t.map(i=>i.name)))
        return chiiOptions;
    } else if (chiiOptions.length > 1) {
        // If there are multiple options, return null to indicate that user needs to choose
        console.warn("Sequence:",'OPTIONS',chiiOptions.map(t=>t.map(i=>i.name)))
        return null;
    } else {
        // If no Chii options are possible, return null
        console.log("Sequence:",'NO CHII')
        return null;
    }
}