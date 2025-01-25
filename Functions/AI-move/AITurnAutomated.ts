import {chooseRandomTile} from './AIChooseRandomTile';
import {discardTile} from '../discardTileFunction';
import {determineBestDiscard} from './determineBestDiscard';
import {
  GameWinds,
  TstolenTiles,
  TTileObject,
  WindTypes,
} from '../../Types/types';

//TODO CHANGE it for standard gameReducer add it as native modules, because it is resource heavy https://www.youtube.com/watch?v=mL1LFMK_myY
//https://github.com/mathvaillant/Android-Native-Modules-in-React-Native/blob/final-version/android/app/src/main/java/com/nativemodulesreactnativev0/MainApplication.kt
const AITurnAutomated = async (
  dispatch: any,
  gameTurn: GameWinds,
  humanPlayerWind: WindTypes,
  playerRightWind: WindTypes,
  playerTopWind: WindTypes,
  playerLeftWind: WindTypes,
  playerRightHand: TTileObject[],
  playerTopHand: TTileObject[],
  playerLeftHand: TTileObject[],
  player1Melds: TstolenTiles[],
  player2Melds: TstolenTiles[],
  player3Melds: TstolenTiles[],
  player4Melds: TstolenTiles[],
  player1RiverState: TTileObject[],
  player2RiverState: TTileObject[],
  player3RiverState: TTileObject[],
  player4RiverState: TTileObject[],
) => {
  //done: optimized by passing props, not calling state every time

  const playerProps =
    gameTurn === playerRightWind
      ? {player: 'player2', hand: playerRightHand}
      : gameTurn === playerTopWind
      ? {player: 'player3', hand: playerTopHand}
      : gameTurn === playerLeftWind
      ? {player: 'player4', hand: playerLeftHand}
      : null;

  if (playerProps === null) return null;

  if (!playerProps || gameTurn === humanPlayerWind) {
    return;
  }
  //let tileToDiscard = chooseRandomTile(playerProps.hand);
  let playerX = playerProps?.player;

  let aiIntelligentMove: TTileObject = determineBestDiscard(
    playerProps.hand,
    player1Melds,
    player2Melds,
    player3Melds,
    player4Melds,
    player1RiverState,
    player2RiverState,
    player3RiverState,
    player4RiverState,
  );

  console.log(
    'AIMOVE aiIntelligentMove:',
    playerProps?.player,
    aiIntelligentMove.name,
  );

  // console.log('AITurnAutomated', playerProps?.player, tileToDiscard?.name);
  //TODO when is tenpai and riichi make smart move from canRiichi funciton with tile to discard!

  discardTile(playerX, aiIntelligentMove, dispatch);
  return;
};

export default AITurnAutomated;
