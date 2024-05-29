/* CHECK_IF_CHII_IS_ON_LEFT_SIDE:(state,action)=>{
    const { playersWind, playerNumber } = action.payload;
    let chiiIsPossible = playerToYourLeftWind(playersWind, state.latestPlayerTurn);
    //console.log("gameReducer CHII:",chiiPossible,playersWind)
    // Update CHII action for the corresponding player based on the calculation
    if (playerNumber === "player1") {
      state.player1Actions.CHII = chiiIsPossible;
    } else if (playerNumber === "player2") {
      state.player2Actions.CHII = chiiIsPossible;
    } else if (playerNumber === "player3") {
      state.player3Actions.CHII = chiiIsPossible;
    } else if (playerNumber === "player4") {
      state.player4Actions.CHII = chiiIsPossible;
    }
  },
  CHECK_FOR_PON:(state,action)=>{
    const { playersWind, playerNumber } = action.payload;
     let ponIsPossible=playersWind!==state.currentTurn //true
     //console.log("redux ponIsPossible:",ponIsPossible,playersWind)
     if (playerNumber === "player1") {
      state.player1Actions.PON = ponIsPossible;
    } else if (playerNumber === "player2") {
      state.player2Actions.PON = ponIsPossible;
    } else if (playerNumber === "player3") {
      state.player3Actions.PON = ponIsPossible;
    } else if (playerNumber === "player4") {
      state.player4Actions.PON = ponIsPossible;
    }
  },
  CHECK_FOR_KAN:(state,action)=>{
    const { playersWind, playerNumber } = action.payload;
    let kanIsPossible=true //true
     if (playerNumber === "player1") {
      state.player1Actions.PON = kanIsPossible;
    } else if (playerNumber === "player2") {
      state.player2Actions.PON = kanIsPossible;
    } else if (playerNumber === "player3") {
      state.player3Actions.PON = kanIsPossible;
    } else if (playerNumber === "player4") {
      state.player4Actions.PON = kanIsPossible;
    }
  }, */