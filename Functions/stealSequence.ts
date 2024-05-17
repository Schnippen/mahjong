import { TTileObject } from "../Types/types";

export function stealSequence(playerHand:TTileObject[], discardedTileArray:TTileObject[]) {
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

    result = possibleSequences.length > 0 ? true : false;
    return { result, possibleSequences };
}