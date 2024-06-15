
//thhis is action for each player besides current one who is active
/* const handlePlayerAction = (actionType) => {
    const currentHand = players[currentPlayer].hand;
    const lastDiscard = discardPile[discardPile.length - 1];

    // Check if the action is valid based on the current hand and last discard
    let validAction = false;
    let actionTiles = [];

    switch (actionType) {
      case CHI:
        // Check if Chi is possible
        validAction = checkChi(currentHand, lastDiscard);
        actionTiles = getChiTiles(currentHand, lastDiscard);
        break;

      case PON:
        // Check if Pon is possible
        validAction = checkPon(currentHand, lastDiscard);
        actionTiles = getPonTiles(currentHand, lastDiscard);
        break;

      case KAN:
        // Check if Kan is possible
        validAction = checkKan(currentHand, lastDiscard);
        actionTiles = getKanTiles(currentHand, lastDiscard);
        break;

      case RON:
        // Check if Ron is possible
        validAction = checkRon(currentHand, lastDiscard);
        actionTiles = getRonTiles(currentHand, lastDiscard);
        break;

      case TSUMO:
        // Check if Tsumo is possible
        validAction = checkTsumo(currentHand);
        actionTiles = getTsumoTiles(currentHand);
        break;

      default:
        break;
    }

    if (validAction) {
     /*  dispatch(playerAction(actionType, currentPlayer, actionTiles));
      dispatch(endTurn()); 
    }
  }; */

