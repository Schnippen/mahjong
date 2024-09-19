import {chooseRandomTile} from './AIChooseRandomTile';
import {discardTile} from '../discardTileFunction';
import store from '../../Store/store';
import {determineBestDiscard} from './determineBestDiscard';
import {
  GameWinds,
  TstolenTiles,
  TTileObject,
  WindTypes,
} from '../../Types/types';

//TODO CHANGE it for standard gameReducer
const AITurnAutomated = (
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
  //TODO optimize by passing props, not calling state every time
  /*  let gameTurn = store.getState().gameReducer.currentTurn;
  let humanPlayerWind = store.getState().playersReducer.player1.wind;
  let playerRightWind = store.getState().playersReducer.player2.wind;
  let playerTopWind = store.getState().playersReducer.player3.wind;
  let playerLeftWind = store.getState().playersReducer.player4.wind;

  let playerRightHand = store.getState().playersReducer.player2.playerHand.hand;
  let playerTopHand = store.getState().playersReducer.player3.playerHand.hand;
  let playerLeftHand = store.getState().playersReducer.player4.playerHand.hand; */

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
  let tileToDiscard = chooseRandomTile(playerProps.hand);
  let playerX = playerProps?.player;
  let aiIntelligentMove = determineBestDiscard(
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
  discardTile(playerX, aiIntelligentMove, dispatch);
};

export default AITurnAutomated;
