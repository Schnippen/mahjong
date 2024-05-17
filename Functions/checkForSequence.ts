import { TTileObject } from "../Types/types"

//this function is only for button popUP, stealing will be in seperate function
export function checkForSequence(playerHand:TTileObject[], discardedTileArray:TTileObject[]) {
    let result: boolean | null= null;
    let possibleSequences:TTileObject[][]= [];

    if (!discardedTileArray || discardedTileArray.length === 0) {
        result = false;
        return { result, possibleSequences };
    }

    let discardedTile = discardedTileArray[0];
    let discardedTileSuit = discardedTile.type;
    let discardedTileValue = Number(discardedTile.value);

    const tilesSuits = ["bamboo", "circles", "characters"];
    let isChiiPossible = tilesSuits.includes(discardedTileSuit);

    if (!isChiiPossible) {
        console.log("Sequence: NO CHII");
        result = false;
        return { result, possibleSequences };
    }

    let suitTiles = playerHand.filter(t => t.type === discardedTileSuit);

    let sequences = [
        [discardedTileValue - 2, discardedTileValue - 1, discardedTileValue], // [2, 3, discardedTile]
        [discardedTileValue - 1, discardedTileValue, discardedTileValue + 1], // [3, discardedTile, 5]
        [discardedTileValue, discardedTileValue + 1, discardedTileValue + 2]  // [discardedTile, 3, 4]
    ];

    sequences.forEach(seq => {
        let sequenceTiles = seq.map(value => {
            if (value === discardedTileValue) return discardedTile;
            return suitTiles.find(tile => Number(tile.value) === value);
        });

        if (sequenceTiles.every(tile => tile !== undefined)) {
            possibleSequences.push(sequenceTiles as TTileObject[]);
        }
    });

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