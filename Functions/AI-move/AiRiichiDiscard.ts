import {TTileObject} from '../../Types/types';

export function AiRiichiDiscard(tiles: TTileObject[]): {
  canRiichi: boolean;
  message: string;
  discardTile: TTileObject | null;
} {
  const start = performance.now();

  if (tiles.length !== 14) {
    return {
      canRiichi: false,
      message: 'Hand must contain exactly 14 tiles',
      discardTile: null,
    };
  }

  function groupTiles(hand: TTileObject[]): Record<string, number> {
    return hand.reduce((acc, tile) => {
      acc[tile.name] = (acc[tile.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  function calculateShanten(hand: TTileObject[]): number {
    let completeGroups = 0;
    let potentialGroups = 0;
    let pairs = 0;
    const grouped = groupTiles(hand);

    // Count triplets and pairs
    Object.values(grouped).forEach(count => {
      if (count >= 3) completeGroups++;
      else if (count === 2) pairs++;
    });

    // Count sequences and potential sequences
    ['characters', 'circles', 'bamboo'].forEach(suit => {
      const suitTiles = hand
        .filter(t => t.type === suit)
        .map(t => Number(t.value))
        .sort((a, b) => a - b);

      // Check complete sequences
      for (let i = 0; i < suitTiles.length - 2; i++) {
        if (
          suitTiles[i] + 1 === suitTiles[i + 1] &&
          suitTiles[i + 1] + 1 === suitTiles[i + 2]
        ) {
          completeGroups++;
          suitTiles.splice(i, 3);
          i -= 3;
        }
      }

      // Check potential sequences
      for (let i = 0; i < suitTiles.length - 1; i++) {
        if (
          suitTiles[i] + 1 === suitTiles[i + 1] ||
          suitTiles[i] + 2 === suitTiles[i + 1]
        ) {
          potentialGroups++;
        }
      }
    });

    const missingGroups = 4 - completeGroups;
    const hasPair = pairs > 0;

    let shanten =
      missingGroups - Math.min(missingGroups, Math.floor(potentialGroups / 2));
    if (!hasPair) shanten++;

    return Math.max(0, shanten);
  }

  function evaluateDiscard(hand: TTileObject[], tile: TTileObject): number {
    const remainingHand = hand.filter(t => t !== tile);
    const shanten = calculateShanten(remainingHand);
    let score = shanten * 100;

    const grouped = groupTiles(hand);

    // Penalties for breaking formations
    if (grouped[tile.name] === 2) score += 50;
    if (grouped[tile.name] === 3) score += 100;

    // Sequence-related penalties
    if (['characters', 'circles', 'bamboo'].includes(tile.type)) {
      const value = Number(tile.value);
      const hasLeftNeighbor = hand.some(
        t => t.type === tile.type && Number(t.value) === value - 1,
      );
      const hasRightNeighbor = hand.some(
        t => t.type === tile.type && Number(t.value) === value + 1,
      );

      if (hasLeftNeighbor && hasRightNeighbor) score += 80;
      else if (hasLeftNeighbor || hasRightNeighbor) score += 40;
    }

    // Honor tile handling
    if (tile.type === 'wind' || tile.type === 'dragon') {
      if (grouped[tile.name] === 1) score -= 20;
    }

    // Terminal tile handling
    if (['1', '9'].includes(String(tile.value))) {
      if (grouped[tile.name] === 1) score -= 10;
    }

    return score;
  }

  function findBestDiscard(hand: TTileObject[]): {
    tile: TTileObject;
    shanten: number;
  } {
    let bestScore = Infinity;
    let bestTile = hand[0];
    let bestShanten = Infinity;

    hand.forEach(tile => {
      const remainingHand = hand.filter(t => t !== tile);
      const currentShanten = calculateShanten(remainingHand);
      const score = evaluateDiscard(hand, tile);

      if (
        score < bestScore ||
        (score === bestScore && currentShanten < bestShanten)
      ) {
        bestScore = score;
        bestTile = tile;
        bestShanten = currentShanten;
      }
    });

    return {
      tile: bestTile,
      shanten: bestShanten,
    };
  }

  const {tile: bestDiscard, shanten: shantenAfterDiscard} =
    findBestDiscard(tiles);
  const end = performance.now();

  console.log(
    `AiRiichiDiscard() took ${((end - start) / 1000).toFixed(3)} seconds.`,
  );

  if (shantenAfterDiscard === 0) {
    return {
      canRiichi: true,
      message: `Hand is in tenpai. Discard ${bestDiscard.name} to declare riichi.`,
      discardTile: bestDiscard,
    };
  }

  return {
    canRiichi: false,
    message: `Hand is ${shantenAfterDiscard} away from tenpai. Best discard: ${bestDiscard.name}`,
    discardTile: bestDiscard,
  };
}
