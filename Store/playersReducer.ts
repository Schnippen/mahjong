import {createSlice} from '@reduxjs/toolkit';
import {
  TTileObject,
  TplayerString,
  TstolenTiles,
  WindTypes,
  whoTheLoserIsType,
} from '../Types/types';
//TODO if i want to make this multiplayer i have to re think how to display player score
//player:Andy Bob Charlie Dylan
export interface PlayersState {
  player1: {
    player1Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player1ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi: boolean;
    temporaryDiscardableTiles: TTileObject[];
  };
  player2: {
    player2Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player2ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi: boolean;
    temporaryDiscardableTiles: TTileObject[];
  };
  player3: {
    player3Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player3ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi: boolean;
    temporaryDiscardableTiles: TTileObject[];
  };
  player4: {
    player4Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player4ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi: boolean;
    temporaryDiscardableTiles: TTileObject[];
  };
  assignHandsBasedOnWind: {
    firstHand: TTileObject[];
    secondHand: TTileObject[];
    thirdHand: TTileObject[];
    fourthHand: TTileObject[];
  };
  whoTheWinnerIs: {
    playerName: TplayerString;
    winnersWind: WindTypes;
    originalEastPlayer: TplayerString;
    eastRoundCounter: number;
    prevailingWind: WindTypes;
    honba: number;
    whoTheLoserIs: whoTheLoserIsType[];
  };
}

const initialState: PlayersState = {
  player1: {
    //you are always player one
    player1Score: 25000,
    name: 'player1',
    wind: 'null',
    position: 'bottom',
    player1ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi: false,
    temporaryDiscardableTiles: [],
  },
  player2: {
    player2Score: 25000,
    name: 'player2',
    wind: 'null',
    position: 'right',
    player2ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi: false,
    temporaryDiscardableTiles: [],
  },
  player3: {
    player3Score: 25000,
    name: 'player3',
    wind: 'null',
    position: 'top',
    player3ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi: false,
    temporaryDiscardableTiles: [],
  },
  player4: {
    player4Score: 25000,
    name: 'player4',
    wind: 'null',
    position: 'left',
    player4ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi: false,
    temporaryDiscardableTiles: [],
  },
  assignHandsBasedOnWind: {
    firstHand: [],
    secondHand: [],
    thirdHand: [],
    fourthHand: [],
  },
  whoTheWinnerIs: {
    playerName: 'null',
    winnersWind: 'null',
    originalEastPlayer: 'null',
    eastRoundCounter: 0,
    prevailingWind: 'east',
    honba: 0,
    whoTheLoserIs: [],
  },
};
//init player1 - base , rest is 0 0 TODO maybe create a reducer?
const player1ScoreDifference = (initialState.player1.player1ScoreDifference =
  initialState.player1.player1Score);
const player2ScoreDifference =
  initialState.player1.player1Score - initialState.player2.player2Score;
const player3ScoreDifference =
  initialState.player1.player1Score - initialState.player3.player3Score;
const player4ScoreDifference =
  initialState.player1.player1Score - initialState.player4.player4Score;

/* console.log('score difference:', [
  player1ScoreDifference,
  player2ScoreDifference,
  player3ScoreDifference,
  player4ScoreDifference,
]); */

export const playersReducer = createSlice({
  name: 'playersReducer',
  initialState,
  reducers: {
    rollSeatsOrderWind: (state, action) => {
      const {player, wind} = action.payload;
      if (player === 'player1') {
        state.player1.wind = wind;
      } else if (player === 'player2') {
        state.player2.wind = wind;
      } else if (player === 'player3') {
        state.player3.wind = wind;
      } else if (player === 'player4') {
        state.player4.wind = wind;
      }
    },
    rollSeatsPosition: (state, action) => {
      const {player, position} = action.payload;
      if (player === 'player1') {
        state.player1.position = position;
      } else if (player === 'player2') {
        state.player2.position = position;
      } else if (player === 'player3') {
        state.player3.position = position;
      } else if (player === 'player4') {
        state.player4.position = position;
      }
    },
    preparedHandsAfterHandOut: (state, action) => {
      const {player, tile} = action.payload;
      //console.log('action', player, tile);
      if (player === 'firstHand') {
        state.assignHandsBasedOnWind.firstHand = [
          ...state.assignHandsBasedOnWind.firstHand,
          ...tile,
        ];
        //console.log('FIRST:', state.firstHand === player);
      } else if (player === 'secondHand') {
        state.assignHandsBasedOnWind.secondHand = [
          ...state.assignHandsBasedOnWind.secondHand,
          ...tile,
        ];
      } else if (player === 'thirdHand') {
        state.assignHandsBasedOnWind.thirdHand = [
          ...state.assignHandsBasedOnWind.thirdHand,
          ...tile,
        ];
      } else if (player === 'fourthHand') {
        state.assignHandsBasedOnWind.fourthHand = [
          ...state.assignHandsBasedOnWind.fourthHand,
          ...tile,
        ];
      }
    },
    assignHandsBasedOnWind: state => {
      if (state.player1.wind === 'east') {
        state.player1.playerHand.hand = [
          ...state.assignHandsBasedOnWind.firstHand,
        ];
      } else if (state.player1.wind === 'south') {
        state.player1.playerHand.hand = [
          ...state.assignHandsBasedOnWind.secondHand,
        ];
      } else if (state.player1.wind === 'west') {
        state.player1.playerHand.hand = [
          ...state.assignHandsBasedOnWind.thirdHand,
        ];
      } else if (state.player1.wind === 'north') {
        state.player1.playerHand.hand = [
          ...state.assignHandsBasedOnWind.fourthHand,
        ];
      }

      if (state.player2.wind === 'east') {
        state.player2.playerHand.hand = [
          ...state.assignHandsBasedOnWind.firstHand,
        ];
      } else if (state.player2.wind === 'south') {
        state.player2.playerHand.hand = [
          ...state.assignHandsBasedOnWind.secondHand,
        ];
      } else if (state.player2.wind === 'west') {
        state.player2.playerHand.hand = [
          ...state.assignHandsBasedOnWind.thirdHand,
        ];
      } else if (state.player2.wind === 'north') {
        state.player2.playerHand.hand = [
          ...state.assignHandsBasedOnWind.fourthHand,
        ];
      }

      if (state.player3.wind === 'east') {
        state.player3.playerHand.hand = [
          ...state.assignHandsBasedOnWind.firstHand,
        ];
      } else if (state.player3.wind === 'south') {
        state.player3.playerHand.hand = [
          ...state.assignHandsBasedOnWind.secondHand,
        ];
      } else if (state.player3.wind === 'west') {
        state.player3.playerHand.hand = [
          ...state.assignHandsBasedOnWind.thirdHand,
        ];
      } else if (state.player3.wind === 'north') {
        state.player3.playerHand.hand = [
          ...state.assignHandsBasedOnWind.fourthHand,
        ];
      }

      if (state.player4.wind === 'east') {
        state.player4.playerHand.hand = [
          ...state.assignHandsBasedOnWind.firstHand,
        ];
      } else if (state.player4.wind === 'south') {
        state.player4.playerHand.hand = [
          ...state.assignHandsBasedOnWind.secondHand,
        ];
      } else if (state.player4.wind === 'west') {
        state.player4.playerHand.hand = [
          ...state.assignHandsBasedOnWind.thirdHand,
        ];
      } else if (state.player4.wind === 'north') {
        state.player4.playerHand.hand = [
          ...state.assignHandsBasedOnWind.fourthHand,
        ];
      }
    },
    discardTileFromHand: (state, action) => {
      const {player, tile} = action.payload;
      if (player === 'player1') {
        state.player1.playerHand.hand = state.player1.playerHand.hand.filter(
          t => t.tileID !== tile.tileID,
        );
        //console.log("handReducer:",state.player1Hand.length)
      } else if (player === 'player2') {
        state.player2.playerHand.hand = state.player2.playerHand.hand.filter(
          t => t.tileID !== tile.tileID,
        );
      } else if (player === 'player3') {
        state.player3.playerHand.hand = state.player3.playerHand.hand.filter(
          t => t.tileID !== tile.tileID,
        );
      } else if (player === 'player4') {
        state.player4.playerHand.hand = state.player4.playerHand.hand.filter(
          t => t.tileID !== tile.tileID,
        );
      }
    },
    drawTileFromWallToHand: (state, action) => {
      const {player, nextTile} = action.payload;
      console.log(
        'REDUX: drawing tile from the wall:',
        nextTile.name,
        'to',
        player,
      );
      if (player === 'player1') {
        state.player1.playerHand.hand.push(nextTile);
      } else if (player === 'player2') {
        state.player2.playerHand.hand.push(nextTile);
      } else if (player === 'player3') {
        state.player3.playerHand.hand.push(nextTile);
      } else if (player === 'player4') {
        state.player4.playerHand.hand.push(nextTile);
      }
    },
    setStolenTilesOnBoard: (state, action) => {
      const {player, tilesArray, name, isOpen, type} = action.payload;
      const newStolenTiles = {name, tiles: tilesArray, isOpen, type: type};
      if (player === 'player1') {
        state.player1.playerHand.melds.push(newStolenTiles);
      } else if (player === 'player2') {
        state.player2.playerHand.melds.push(newStolenTiles);
      } else if (player === 'player3') {
        state.player3.playerHand.melds.push(newStolenTiles);
      } else if (player === 'player4') {
        state.player4.playerHand.melds.push(newStolenTiles);
      }
    },
    setRiichi: (state, action) => {
      const {player, val} = action.payload;
      if (player === 'player1') {
        state.player1.isRiichi = val;
      } else if (player === 'player2') {
        state.player2.isRiichi = val;
      } else if (player === 'player3') {
        state.player3.isRiichi = val;
      } else if (player === 'player4') {
        state.player4.isRiichi = val;
      }
    },
    calculateScore: (state, action) => {
      const {player, val} = action.payload;
      if (player === 'player1') {
        state.player1.player1Score += val;
      } else if (player === 'player2') {
        state.player2.player2Score += val;
      } else if (player === 'player3') {
        state.player3.player3Score += val;
      } else if (player === 'player4') {
        state.player4.player4Score += val;
      }
    },
    rotateWindOrder: state => {
      const WinnerName = state.whoTheWinnerIs.playerName;
      const WinnerWind = state.whoTheWinnerIs.winnersWind;

      const winds: Array<WindTypes> = ['east', 'south', 'west', 'north'];
      const playersArray = [
        state.player1,
        state.player2,
        state.player3,
        state.player4,
      ];
      if (WinnerWind !== 'east') {
        // rotate wind for each player
        //https://www.mahjongtime.com/mahjong-japanese-rules-5.html
        //3.4.9
        //https://riichi.wiki/Honba
        playersArray.forEach(player => {
          const currentWindIndex = winds.indexOf(player.wind);
          const newWindIndex = (currentWindIndex + 1) % winds.length;
          player.wind = winds[newWindIndex];
        });
        //reset honba
        state.whoTheWinnerIs.honba = initialState.whoTheWinnerIs.honba;
      }
      //https://riichi.wiki/Renchan
      if (WinnerWind === 'east') {
        state.whoTheWinnerIs.honba++;
      }
    },
    resetPlayersReducer_TOTAL_RESET: state => {
      console.log('resetPlayersReducer_TOTAL_RESET - RESET');
      //BUG NO DORA RESET!!!!! they are in wall reducer ;-/
      return {...initialState};
    },
    resetPlayersReducerToNextRound: state => {
      //no score change
      //no hand change
      //no wind change
      return {
        ...state,
        player1: {
          ...initialState.player1,
          player1Score: state.player1.player1Score,
          playerHand: state.player1.playerHand,
          wind: state.player1.wind,
        },
        player2: {
          ...initialState.player2,
          player2Score: state.player2.player2Score,
          playerHand: state.player2.playerHand,
          wind: state.player2.wind,
        },
        player3: {
          ...initialState.player3,
          player3Score: state.player3.player3Score,
          playerHand: state.player3.playerHand,
          wind: state.player3.wind,
        },
        player4: {
          ...initialState.player4,
          player4Score: state.player4.player4Score,
          playerHand: state.player4.playerHand,
          wind: state.player4.wind,
        },
        assignHandsBasedOnWind: {
          ...initialState.assignHandsBasedOnWind,
        },
      }; //TODO reset temporary tiles
    },
    resetPlayersReducerHandsToNextRound: state => {
      return {
        ...state,
        player1: {
          ...state.player1,
          playerHand: {
            ...state.player1.playerHand,
            hand: [],
            melds: [],
          },
        },
        player2: {
          ...state.player2,
          playerHand: {
            ...state.player2.playerHand,
            hand: [],
            melds: [],
          },
        },
        player3: {
          ...state.player3,
          playerHand: {
            ...state.player3.playerHand,
            hand: [],
            melds: [],
          },
        },
        player4: {
          ...state.player4,
          playerHand: {
            ...state.player4.playerHand,
            hand: [],
            melds: [],
          },
        },
      };
    },
    changeWhoTheWinnerIs: (state, action) => {
      const {TypeOfAction, valuePlayerName, valuePlayerWind} = action.payload;
      if (TypeOfAction === 'update') {
        state.whoTheWinnerIs.playerName = valuePlayerName;
        state.whoTheWinnerIs.winnersWind = valuePlayerWind;
      }
      if (TypeOfAction === 'reset') {
        state.whoTheWinnerIs.playerName =
          initialState.whoTheWinnerIs.playerName;
        state.whoTheWinnerIs.winnersWind =
          initialState.whoTheWinnerIs.winnersWind;
      }
      if (TypeOfAction === 'updateOriginalEastPlayer') {
        state.whoTheWinnerIs.originalEastPlayer = valuePlayerName;
      }
    },
    changeWhoTheLoserIs: (state, action) => {
      const {TypeOfAction, valuePlayerName, valuePlayerWind} = action.payload;

      if (TypeOfAction === 'updateRON') {
        const playersArray = [
          state.player1,
          state.player2,
          state.player3,
          state.player4,
        ];
        const loserPlayers = playersArray.filter(
          p => p.wind === valuePlayerWind,
        );
        if (loserPlayers.length > 0) {
          const loserPlayer = loserPlayers[0]; //wind is unique
          state.whoTheWinnerIs.whoTheLoserIs = [
            ...state.whoTheWinnerIs.whoTheLoserIs,
            {loserName: loserPlayer.name, loserWind: loserPlayer.wind},
          ];
        } else {
          // it is almost impossible
          console.error(`No player found with wind: ${valuePlayerWind}`);
        }
      } else if (TypeOfAction === 'updateTSUMO') {
        // TSUMO - Multiple losers
        const playersArray = [
          state.player1,
          state.player2,
          state.player3,
          state.player4,
        ];
        const loserPlayersArray = playersArray.filter(
          p => p.name !== valuePlayerName,
        );
        state.whoTheWinnerIs.whoTheLoserIs = [];
        loserPlayersArray.forEach(loser => {
          state.whoTheWinnerIs.whoTheLoserIs.push({
            loserName: loser.name,
            loserWind: loser.wind,
          });
        });
      } else if (TypeOfAction === 'reset') {
        state.whoTheWinnerIs.whoTheLoserIs = [];
      }
    },
    changePrevailingWind: state => {
      const winds: Array<WindTypes> = ['east', 'south', 'west', 'north'];
      const playersArray = [
        state.player1,
        state.player2,
        state.player3,
        state.player4,
      ];
      const currentEastPlayer = playersArray.find(
        player => player.wind === 'east',
      );
      if (
        currentEastPlayer &&
        currentEastPlayer.name === state.whoTheWinnerIs.originalEastPlayer
      ) {
        state.whoTheWinnerIs.eastRoundCounter++;
        if (state.whoTheWinnerIs.eastRoundCounter === 4) {
          state.whoTheWinnerIs.prevailingWind = 'south';
          state.whoTheWinnerIs.eastRoundCounter = 0; // reset counter for South rounds, but what if game takes long up to north?
        } //TODO there might be error, what if east player was 4 times in a row the same wind?

        /*       2.2 Prevailing wind
When the game begins, east is the Prevailing wind. When the player who started the game as East, becomes East again after all other players have played at least one hand as East, the south round begins, and south is the Prevailing wind. A wind marker should be placed permanently by the player who begins as East, and when this player becomes East again after the first (east) round of the game, the marker is flipped to indicate the new Prevailing wind, south. */
      }
    },
    setTemporaryDiscardableTiles: (state, action) => {
      //this one is used after declaring riichi, select the tile that will not brake the game
      const {TypeOfAction, temporaryTiles, player} = action.payload;
      console.log(
        'REDUX!: seTemporaryDiscardableTiles: --------------RUNS',
        'type_of_action:',
        TypeOfAction,
        temporaryTiles.map(t => t.name),
        player,
      );
      //
      if (TypeOfAction === 'reset') {
        state.player1.temporaryDiscardableTiles =
          initialState.player1.temporaryDiscardableTiles;
        //TODO fill the rest players
      }
      if (TypeOfAction === 'set') {
        if (player === 'player1') {
          console.log('redux - temporaryTiles p1 run');
          state.player1.temporaryDiscardableTiles = [...temporaryTiles];
        } else if (player === 'player2') {
          state.player2.temporaryDiscardableTiles = [...temporaryTiles];
        } else if (player === 'player3') {
          state.player3.temporaryDiscardableTiles = [...temporaryTiles];
        } else if (player === 'player4') {
          state.player4.temporaryDiscardableTiles = [...temporaryTiles];
        } else {
          null;
        } //TODO i can make it more refined
      }
      console.log(
        'REDUX!: seTemporaryDiscardableTiles koniec:',
        state.player1.temporaryDiscardableTiles.map(t => t.name),
      );
    },
    HONBA_REDUCER: (state, action) => {
      let {TypeOfAction} = action.payload;
      if (TypeOfAction === 'increment') {
        state.whoTheWinnerIs.honba++;
      }
      if (TypeOfAction === 'reset') {
        state.whoTheWinnerIs.honba = initialState.whoTheWinnerIs.honba;
      }
    },
    DEBUG_HAND: (state, action) => {
      let begginingHand = state.player1.playerHand.hand;
      if (begginingHand.length === 14) {
        console.warn('I AM SPECIAL DEBUG HAND');
      } else {
        state.player1.playerHand.hand = initialState.player1.playerHand.hand;
        let handForDebugging = action.payload;
        state.player1.playerHand.hand = [...handForDebugging];
      }
      console.log('REDUX DEBUG_HAND');
      //ok se here we have some problems:
      //-i can't do riichi on my turn, but can o foe's turn
      //-if this is first turn in a game i can't make richii
      //so there is problem probably in rungame.ts,...yes rungame checks riichi for previous player, not the current one... FIX
      //there is a bug in which riichi button is active while ai turn is up
      //there is a bug when chii is possible the riichi button is active when in tenpai
      //sometimes ai makes first turn even if the wall and hand is not fully rendered
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  rollSeatsOrderWind,
  rollSeatsPosition,
  preparedHandsAfterHandOut,
  assignHandsBasedOnWind,
  discardTileFromHand,
  drawTileFromWallToHand,
  rotateWindOrder,
  setRiichi,
  calculateScore,
  setStolenTilesOnBoard,
  resetPlayersReducer_TOTAL_RESET,
  resetPlayersReducerToNextRound,
  resetPlayersReducerHandsToNextRound,
  changeWhoTheWinnerIs,
  changeWhoTheLoserIs,
  changePrevailingWind,
  setTemporaryDiscardableTiles,
  HONBA_REDUCER,
  DEBUG_HAND,
} = playersReducer.actions;

export default playersReducer.reducer;
