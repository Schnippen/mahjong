import {createSlice} from '@reduxjs/toolkit';
import {TTileObject, TplayerString, TstolenTiles, WindTypes} from '../Types/types';
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
    isRiichi:boolean
  };
  player2: {
    player2Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player2ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi:boolean
  };
  player3: {
    player3Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player3ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi:boolean
  };
  player4: {
    player4Score: number;
    name: TplayerString;
    wind: WindTypes;
    position: string;
    player4ScoreDifference: number;
    playerHand: {hand: TTileObject[]; melds: TstolenTiles[]};
    isRiichi:boolean
  };
  assignHandsBasedOnWind: {
    firstHand: TTileObject[];
    secondHand: TTileObject[];
    thirdHand: TTileObject[];
    fourthHand: TTileObject[];
  };
}

const initialState: PlayersState = {
  player1: {
    //you are always player one
    player1Score: 10000,
    name: 'player1',
    wind: 'null',
    position: 'bottom',
    player1ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi:false,
  },
  player2: {
    player2Score: 15000,
    name: 'player2',
    wind: 'null',
    position: 'right',
    player2ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi:false,
  },
  player3: {
    player3Score: 20000,
    name: 'player3',
    wind: 'null',
    position: 'top',
    player3ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi:false,
  },
  player4: {
    player4Score: 25000,
    name: 'player4',
    wind: 'null',
    position: 'left',
    player4ScoreDifference: 0,
    playerHand: {hand: [], melds: []},
    isRiichi:false,
  },
  assignHandsBasedOnWind: {
    firstHand: [],
    secondHand: [],
    thirdHand: [],
    fourthHand: [],
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

console.log('score difference:', [
  player1ScoreDifference,
  player2ScoreDifference,
  player3ScoreDifference,
  player4ScoreDifference,
]);

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
      const {player, tilesArray, name, isOpen} = action.payload;
      const newStolenTiles = {name, tiles: tilesArray, isOpen};
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
    setRiichi:(state,action)=>{
      const {player,val} = action.payload;
      if (player === 'player1') {
        state.player1.isRiichi=val
      } else if (player === 'player2') {
        state.player2.isRiichi=val
      } else if (player === 'player3') {
        state.player3.isRiichi=val
      } else if (player === 'player4') {
        state.player4.isRiichi=val
      }
    },
    rotateWindOrder: (state, action) => {
      const winds:Array<WindTypes> = ['east', 'south', 'west', 'north'];
      const playersArray = [
        state.player1,
        state.player2,
        state.player3,
        state.player4,
      ];
      // Rotate winds
      playersArray.forEach(player => {
        const currentWindIndex = winds.indexOf(player.wind);
        const newWindIndex = (currentWindIndex + 1) % winds.length;
        player.wind = winds[newWindIndex];
      });
    },
    changePrevailingWind: (state, action) => {
      //state.value += action.payload
      //this should be in game reducer
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
  setStolenTilesOnBoard,
  changePrevailingWind,
} = playersReducer.actions;

export default playersReducer.reducer;
