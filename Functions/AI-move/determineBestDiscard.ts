import store from '../../Store/store';
import {TstolenTiles, TTileObject} from '../../Types/types';
import {calculateDangerScore} from './AI-Logic/calculateDangerScore';
import {calculateEfficiency} from './AI-Logic/calculateEfficiency';
import calculateShanten from './AI-Logic/calculateShanten';
import {chooseRandomTile} from './AIChooseRandomTile';
import {getAllPossibleTilesAIThink} from './getAllPossibleTilesAIThink';
import {getAllVisibleTilesAIThink} from './getAllVisibleTilesAIThink';

export const determineBestDiscard = (
  hand: TTileObject[],
  player1Melds: TstolenTiles[],
  player2Melds: TstolenTiles[],
  player3Melds: TstolenTiles[],
  player4Melds: TstolenTiles[],
  player1RiverState: TTileObject[],
  player2RiverState: TTileObject[],
  player3RiverState: TTileObject[],
  player4RiverState: TTileObject[],
) => {
  const start = performance.now();
  //let gameTurn = store.getState().gameReducer.currentTurn;

  //be sure to pass the state as props to achieve better performance
  //current ai hand hand:TTileObject[]
  /*   let player1Melds = store.getState().playersReducer.player1.playerHand.melds;
  let player2Melds = store.getState().playersReducer.player2.playerHand.melds;
  let player3Melds = store.getState().playersReducer.player3.playerHand.melds;
  let player4Melds = store.getState().playersReducer.player4.playerHand.melds;
  let player1RiverState = store.getState().riverReducer.player1River.riverState;
  let player2RiverState = store.getState().riverReducer.player2River.riverState;
  let player3RiverState = store.getState().riverReducer.player3River.riverState;
  let player4RiverState = store.getState().riverReducer.player4River.riverState;
 */
  let {possibleTiles} = getAllPossibleTilesAIThink({
    hand,
    player1Melds,
    player2Melds,
    player3Melds,
    player4Melds,
    player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,
  }); //possible tiles

  let {visibleTiles} = getAllVisibleTilesAIThink({
    hand,
    player1Melds,
    player2Melds,
    player3Melds,
    player4Melds,
    player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,
  });

  let bestDiscard: TTileObject | null = null;
  let bestScore = -Infinity;

  //if someone is in richii change weights, or if close to tenpai use prioretize winning

  //https://riichi.wiki/Shanten
  //Shanten refers to the minimum number of tiles required in order for a hand to reach tenpai.
  hand.forEach(tile => {
    //simulating discards
    const handAfterDiscard = hand.filter(t => t !== tile);
    //calculating shanten after discard
    const shantenAfterDiscard = calculateShanten(handAfterDiscard); //number

    //calculating efficiency - how many tiles can complete the hand
    const efficiencyScore = calculateEfficiency(
      handAfterDiscard,
      possibleTiles,
    );

    // penalizing discards that help opponents?!
    const dangerScore = calculateDangerScore(tile, possibleTiles, visibleTiles);

    // adjustable weights
    let efficiencyWeight = 0.5;
    let shantenWeight = 100;
    let dangerWeight = 0.1;

    //calculate final score for THIS tile discard option
    const discardScore =
      efficiencyWeight * efficiencyScore -
      shantenWeight * shantenAfterDiscard -
      dangerWeight * dangerScore;

    if (discardScore > bestScore) {
      bestScore = discardScore;
      bestDiscard = tile;
    }
    /*   console.log(
      'AI MOVE BEST SCORE: ',
      'shantendAfterDiscard:',
      shantenAfterDiscard,
      'efficiency:',
      efficiencyScore,
      'danger:',
      dangerScore,
      'discardScore:',
      discardScore,
      tile.name,
      shantenAfterDiscard === 0 ? 'isTenpai' : null,
    ); */
  });
  let randomTileToDiscard = chooseRandomTile(hand);

  const end = performance.now();
  /*  console.log(
    `AIMove() took ook ${end - start} milliseconds. - ${
      (end - start) / 1000
    } seconds`,
  ); */
  console.log(
    'AIMOVE Automated choice:',
    bestDiscard !== null
      ? bestDiscard?.name
      : `RandomTile:${randomTileToDiscard.name}`,
    `AIMove() took- ${((end - start) / 1000).toFixed(3)} seconds`,
  );
  return bestDiscard || randomTileToDiscard;
};
