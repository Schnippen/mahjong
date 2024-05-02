import {createSlice} from '@reduxjs/toolkit';
//TODO if i want to make this multiplayer i have to re think how to display player score
//player:Andy Bob Charlie Dylan
interface PlayersState {
  player1: {
    player1Score: number;
    player1Wind: string;
    player1SeatPosition: string;
  };
  player2: {
    player2Score: number;
    player2Wind: string;
    player2SeatPosition: string;
  };
  player3: {
    player3Score: number;
    player3Wind: string;
    player3SeatPosition: string;
  };
  player4: {
    player4Score: number;
    player4Wind: string;
    player4SeatPosition: string;
  };
}

const initialState: PlayersState = {
  player1: {
    //you are always player one
    player1Score: 10000,
    player1Wind: 'string',
    player1SeatPosition: 'bottom',
  },
  player2: {
    player2Score: 15000,
    player2Wind: 'string',
    player2SeatPosition: '',
  },
  player3: {
    player3Score: 20000,
    player3Wind: 'string',
    player3SeatPosition: '',
  },
  player4: {
    player4Score: 25000,
    player4Wind: 'string',
    player4SeatPosition: '',
  },
};

export const playersReducer = createSlice({
  name: 'playersReducer',
  initialState,
  reducers: {
    rollSeatsOrder: (state, action) => {
      const {player, wind} = action.payload;
      if (player === 'player1') {
        state.player1.player1Wind = wind;
      } else if (player === 'player2') {
        state.player2.player2Wind = wind;
      } else if (player === 'player3') {
        state.player3.player3Wind = wind;
      } else if (player === 'player4') {
        state.player4.player4Wind = wind;
      }
    },
    rollSeatsPosition: (state, action) => {
      const {player, position} = action.payload;
      if (player === 'player1') {
        state.player1.player1SeatPosition = position;
      } else if (player === 'player2') {
        state.player2.player2SeatPosition = position;
      } else if (player === 'player3') {
        state.player3.player3SeatPosition = position;
      } else if (player === 'player4') {
        state.player4.player4SeatPosition = position;
      }
    },
    incrementByAmount: (state, action) => {
      //state.value += action.payload
    },
    changePrevailingWind: (state, action) => {
      //state.value += action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  rollSeatsOrder,
  rollSeatsPosition,
  incrementByAmount,
  changePrevailingWind,
} = playersReducer.actions;

export default playersReducer.reducer;
