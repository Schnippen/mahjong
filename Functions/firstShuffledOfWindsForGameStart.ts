import {setPlayerHandsAfterHandOut} from '../Store/handReducer';
import {rollSeatsOrder, rollSeatsPosition} from '../Store/playersReducer';

const firstShuffledOfWindsForGameStart = (dispatch: any) => {
  const winds = ['east', 'south', 'west', 'north'];
  const index = Math.floor(Math.random() * winds.length);
  const player1 = winds[index];
  const positions = ['bottom', 'right', 'top', 'left'];
  dispatch(rollSeatsOrder({player: 'player1', wind: player1}));
  dispatch(rollSeatsPosition({player: 'player1', position: 'bottom'}));
  dispatch(setPlayerHandsAfterHandOut({player: 'player1', wind: player1}));
  for (let i = 0; i < winds.length; i++) {
    const player = 'player' + (i + 1);
    const windIndex = (index + i) % winds.length;
    dispatch(rollSeatsOrder({player, wind: winds[windIndex]}));
    dispatch(rollSeatsPosition({player, position: positions[i]}));
    dispatch(setPlayerHandsAfterHandOut({player, wind: winds[windIndex]}));
  }
};
export default firstShuffledOfWindsForGameStart;
