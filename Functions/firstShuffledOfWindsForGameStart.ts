import {handState} from '../Store/handReducer';
import {rollSeatsOrderWind, rollSeatsPosition} from '../Store/playersReducer';

const firstShuffledOfWindsForGameStart = (dispatch: any) => {
  const winds = ['east', 'south', 'west', 'north'];
  const index = Math.floor(Math.random() * winds.length);
  const player1Wind = winds[index];
  const positions = ['bottom', 'right', 'top', 'left'];
  dispatch(rollSeatsOrderWind({player: 'player1', wind: player1Wind}));
  dispatch(rollSeatsPosition({player: 'player1', position: 'bottom'}));
  for (let i = 0; i < winds.length; i++) {
    const player = 'player' + (i + 1);
    const windIndex = (index + i) % winds.length;
    //const playerHand = `${player}Hand` as keyof handState;
    //console.log("firstShuffledOfWindsForGameStart",player,positions[i], winds[windIndex])
    dispatch(rollSeatsOrderWind({player, wind: winds[windIndex]}));
    dispatch(rollSeatsPosition({player, position: positions[i]}));
    }
};
export default firstShuffledOfWindsForGameStart;


/* export const WINDS = {
  EAST: 'East',
  SOUTH: 'South',
  WEST: 'West',
  NORTH: 'North',
};

export const WIND_ORDER = [WINDS.EAST, WINDS.SOUTH, WINDS.WEST, WINDS.NORTH]; */
/* const [currentWind, setCurrentWind] = useState(WINDS.EAST);

  // Function to rotate the wind
  const rotateWind = () => {
    const currentIndex = WIND_ORDER.indexOf(currentWind);
    const nextIndex = (currentIndex + 1) % WIND_ORDER.length;
    setCurrentWind(WIND_ORDER[nextIndex]);
  }; */