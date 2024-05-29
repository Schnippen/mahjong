/* 
const handlePassStealingTiles = (dispatch: any) => {
    setDisplayChiiButton(false);
    setDisplayPonButton(false);
    setDisplayKanButton(false);
    dispatch(INTERRUPT_TURN({val: false}));
    console.log('handlePassStealingTiles()');
  };

  const stopDisplayingStealingButtonsIfPanelChiiIsPresent = () => {
    setDisplayChiiButton(false);
    setDisplayPonButton(false);
    setDisplayKanButton(false);
  };

  const addSequenceToHand = (
    possibleSequences: TTileObject[][],
    dispatch: any,
    currentDiscard: TTileObject[],
  ) => {
    let flattenedSequence = possibleSequences.flat();
    let currentDiscardedTile = currentDiscard[0];
    let tilesOnHandWithoutDiscardedTile = flattenedSequence.filter(
      t => t.tileID !== currentDiscardedTile.tileID,
    );
    let tilesThatWillBeDisplayedAsStolen = flattenedSequence;
    tilesOnHandWithoutDiscardedTile.forEach(tile => {
      dispatch(discardTileFromHand({player: 'player1', tile: tile}));
    });
    dispatch(
      setStolenTilesOnBoard({
        player: 'player1',
        tilesArray: tilesThatWillBeDisplayedAsStolen,
        name: 'left',
        isOpen: true,
      }),
    );
    dispatch(popFromTheRiver({player: 'player4'})); //TODO this is so, because of chii
    stopDisplayingStealingButtonsIfPanelChiiIsPresent();
    //dispatch(SET_LATEST_TURN())
  };

  const handleStealSequence = (
    handData: TTileObject[],
    currentDiscard: TTileObject[],
    dispatch: any,
  ) => {
    const {result, possibleSequences} = stealSequence(handData, currentDiscard);
    if (result && possibleSequences.length === 1) {
      console.log(
        'handleStealSequence',
        possibleSequences.map(i => i.map(t => t.name)),
      );
      addSequenceToHand(possibleSequences, dispatch, currentDiscard);
      //return null;
    }
    if (result && possibleSequences.length > 1) {
      console.log(
        'handleStealSequence',
        possibleSequences.map(i => i.map(t => t.name)),
      );
      setChiiPanelState(possibleSequences);
      setChiiPanelDisplayed(true);
      stopDisplayingStealingButtonsIfPanelChiiIsPresent();
    }
    return null;
  };

 

  const handleStealTriplet = (
    handData: TTileObject[],
    currentDiscard: TTileObject[],
    dispatch: any,
    latestPlayerTurn: string,
  ) => {
    let orderArray = ['east', 'south', 'west', 'north'].indexOf(
      latestPlayerTurn,
    );
    let positionArray = ['bottom', 'right', 'top', 'left']; //["player1","player2","player3","player4"]
    let playerPosition = ['player1', 'player2', 'player3', 'player4'];
    let playerPos = playerPosition[orderArray];
    let position = positionArray[orderArray];
    let {result, ponArray} = stealTriplet(handData, currentDiscard, position);
    console.log(
      'stealTriplet:',
      result,
      ponArray?.map(t => t.name),
      'playerPos:',
      playerPos,
    );
    ponArray?.forEach(tile => {
      dispatch(discardTileFromHand({player: 'player1', tile: tile}));
    });
    dispatch(
      setStolenTilesOnBoard({
        player: 'player1',
        tilesArray: ponArray,
        name: 'position',
        isOpen: true,
      }),
    );
    dispatch(popFromTheRiver({player: playerPos}));
    setDisplayChiiButton(false);
    setDisplayKanButton(false);
    setDisplayPonButton(false);
    dispatch(SET_LATEST_TURN());
  };

  const handleStealQuadruplet = (
    handData: TTileObject[],
    currentDiscard: TTileObject[],
    dispatch: any,
    latestPlayerTurn: string,
  ) => {
    let orderArray = ['east', 'south', 'west', 'north'].indexOf(
      latestPlayerTurn,
    );
    let positionArray = ['bottom', 'right', 'top', 'left']; //["player1","player2","player3","player4"]
    let playerPosition = ['player1', 'player2', 'player3', 'player4'];
    let playerPos = playerPosition[orderArray];
    let position = positionArray[orderArray];
    let {result, kanArray} = stealQuadruplet(
      handData,
      currentDiscard,
      position,
    );
    console.log(
      'stealQuadruplet:',
      result,
      kanArray?.map(t => t.name),
    );
    kanArray?.forEach(tile => {
      dispatch(discardTileFromHand({player: 'player1', tile: tile}));
    });
    dispatch(
      setStolenTilesOnBoard({
        player: 'player1',
        tilesArray: kanArray,
        name: 'position',
        isOpen: true,
      }),
    );
    dispatch(popFromTheRiver({player: playerPos}));
    dispatch(SET_LATEST_TURN());
  }; */