import { TTileObject } from "../Types/types"

//this function is only for button popUP, stealing will be in seperate function
export function checkForSequence(playerHand: TTileObject[], discardedTileArray: TTileObject[]) {
    if (!discardedTileArray || discardedTileArray.length === 0) {
        return false;
    }

    let discardedTile = discardedTileArray[0];
    let discardedTileSuit = discardedTile.type;
    let discardedTileValue = Number(discardedTile.value);

    const tilesSuits = ["bamboo", "circles", "characters"];
    let isChiiPossible = tilesSuits.indexOf(discardedTileSuit);

    if (isChiiPossible === -1) {
        console.log("Sequence: NO CHII");
        return false;
    }

    let suitTiles = playerHand.filter(t => t.type === discardedTileSuit);
    if (suitTiles.length < 2) {
        console.log("Sequence: NO CHII");
        return false;
    }

    let possibleSequences: TTileObject[][] = [];

    // Check for sequences with the discarded tile
    for (let i = 0; i < suitTiles.length; i++) {
        let sequence: TTileObject[] = [discardedTile];
        let currentTile = suitTiles[i];
        if (Math.abs(Number(currentTile.value) - discardedTileValue) <= 2) {
            sequence.push(currentTile);
            let nextValue = discardedTileValue + (discardedTileValue < Number(currentTile.value) ? 1 : -1);
            let nextTile = suitTiles.find(tile => Number(tile.value) === nextValue);
            if (nextTile) {
                sequence.push(nextTile);
                possibleSequences.push(sequence);
            }
        }
    }

    if (possibleSequences.length === 1) {
        console.warn("Sequence: First", "Discarded", "Third", possibleSequences.map(t => t.map(i => i.name)))
        return true;
    } else if (possibleSequences.length > 1) {
        console.warn("Sequence: OPTIONS", possibleSequences.map(t => t.map(i => i.name)))
        return true;
    } else {
        console.log("Sequence: NO CHII")
        return false;
    }
}



//this function will return other function that dispatches [option] output to StealTilesPanel...