import {chooseRandomTile} from './AIChooseRandomTile';
import {discardTile} from '../discardTileFunction';
import store from '../../Store/store';

//TODO CHANGE it for standard gameReducer
const AITurnAutomated = (
  dispatch: any, //TODO dispatch
) => {
  let gameTurn = store.getState().gameReducer.currentTurn;
  let humanPlayerWind = store.getState().playersReducer.player1.wind;
  let playerRightWind = store.getState().playersReducer.player2.wind;
  let playerTopWind = store.getState().playersReducer.player3.wind;
  let playerLeftWind = store.getState().playersReducer.player4.wind;

  let playerRightHand = store.getState().playersReducer.player2.playerHand.hand;
  let playerTopHand = store.getState().playersReducer.player3.playerHand.hand;
  let playerLeftHand = store.getState().playersReducer.player4.playerHand.hand;

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
  console.log('AITurnAutomated', playerProps?.player, tileToDiscard?.name);
  discardTile(playerX, tileToDiscard, dispatch);
};

export default AITurnAutomated;
