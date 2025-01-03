import {IsTenpaiResult, TTileObject, TstolenTiles} from '../../Types/types';
import {checkMelds} from './checkMelds';
import {countTilesByName} from './countTilesByName';
import {getAllPossibleTiles} from './getAllPossibleTilesNow';
import {checkWinningHand} from './checkingWinningHand';

type IsTenpaiTypes = {
  hand: TTileObject[];
  player1Melds: TstolenTiles[];
  player2Melds: TstolenTiles[];
  player3Melds: TstolenTiles[];
  player4Melds: TstolenTiles[];
  player1RiverState: TTileObject[];
  player2RiverState: TTileObject[];
  player3RiverState: TTileObject[];
  player4RiverState: TTileObject[];
  nextTile: TTileObject;
};

export function isTenpai({
  hand,
  player1Melds,
  player2Melds,
  player3Melds,
  player4Melds,
  player1RiverState,
  player2RiverState,
  player3RiverState,
  player4RiverState,
  nextTile,
}: IsTenpaiTypes): IsTenpaiResult {
  const discardableTiles: Set<TTileObject> = new Set(); //store valid discardable tiles

  if (hand.length !== 13)
    return {result: false, discardableTiles: discardableTiles};
  //console.info('isTenpai:', hand.length !== 13, 'safety check - there are melds');
  // Tenpai requires exactly 13 tiles in hand, so no melds

  //const fullHand = [...hand, nextTile]; // including nextTile in the hand
  //const tileCounts = countTilesByName(hand);
  // checking all possible tiles that could be drawn to form a winning hand
  // iterating through each tile in the full hand to simulate discarding
  // sorting hand and nextTile alphabetically by name for visual clarity
  const sortedHand = [...hand, nextTile].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  console.debug(
    `isTenpai(): Starting Tenpai check. Sorted Hand: ${sortedHand
      .map(t => t.name)
      .join(', ')}`,
  );
  for (const tileThatNeedsToBeDiscarded of sortedHand) {
    const tempHand = sortedHand.filter(
      tile => tile !== tileThatNeedsToBeDiscarded,
    );
    for (const waitingForPossibleWinningTile of getAllPossibleTiles({
      hand: tempHand,
      player1Melds,
      player2Melds,
      player3Melds,
      player4Melds,
      player1RiverState,
      player2RiverState,
      player3RiverState,
      player4RiverState,
    })) {
      const simulatedHand = [...tempHand, waitingForPossibleWinningTile];

      //validating if the simulated hand is a winning hand
      if (checkWinningHand(simulatedHand)) {
        // Sort the resulting winning hand alphabetically for logging
        const sortedSimulatedHand = simulatedHand.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        //TODO remove this console.info, too much clutter
        console.info(
          `isTenpai(): Tenpai possible! After discarding: ${
            tileThatNeedsToBeDiscarded.name
          }, Possible draw: ${
            waitingForPossibleWinningTile.name
          }, Winning hand: ${sortedSimulatedHand.map(t => t.name).join(', ')}`,
        );

        // add tile to the list
        discardableTiles.add(tileThatNeedsToBeDiscarded);
      }
    }
  }
  if (discardableTiles.size > 0) {
    console.info(
      `isTenpai(): Valid discardable tile names: ${[
        ...discardableTiles.values(),
      ]
        .map(tile => tile.name)
        .join(', ')}`,
    ); //TODO
    return {result: true, discardableTiles: discardableTiles};
    //return true;
  }

  //console.info('isTenpai(): No valid Tenpai configuration found.');
  return {result: false, discardableTiles: discardableTiles}; // No valid Tenpai configuration found
}
