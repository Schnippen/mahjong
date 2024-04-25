import {useDispatch, useSelector} from 'react-redux';
import store, {RootState} from '../Store/store';
import {setWallFragment} from '../Store/wallReducer';
function checkDiceRoll(roll: number) {
  const EAST = [1, 5, 9];
  const SOUTH = [2, 6, 10];
  const WEST = [3, 7, 11];
  const NORTH = [4, 8, 12];
  if (EAST.includes(roll)) {
    console.log('EAST', ' Dice:', roll);
    return roll;
  } else if (SOUTH.includes(roll)) {
    console.log('SOUTH', ' Dice:', roll);
    return roll;
  } else if (WEST.includes(roll)) {
    console.log('WEST', ' Dice:', roll);
    return roll;
  } else if (NORTH.includes(roll)) {
    console.log('NORTH', ' Dice:', roll);
    return roll;
  }
}
const finishedWall = useSelector(
  (state: RootState) => state.wallReducer.wallTilesArray,
);
/*   const allWallTiles = 136;
  const EastPlayer = 34;
  const SouthPlayer = 34;
  const WestPlayer = 34;
  const NorthPlayer = 34; */ //should it be hardcoded?
const EastWall = finishedWall.slice(0, 34);
const SouthWall = finishedWall.slice(34, 68);
const WestWall = finishedWall.slice(68, 102);
const NorthWall = finishedWall.slice(102, 136);
const dispatch = useDispatch();

function WallCalculation() {
  dispatch(setWallFragment({direction: 'east', tiles: EastWall}));
  dispatch(setWallFragment({direction: 'south', tiles: SouthWall}));
  dispatch(setWallFragment({direction: 'west', tiles: WestWall}));
  dispatch(setWallFragment({direction: 'north', tiles: NorthWall}));
  const DICE_ROLL = Math.floor(Math.random() * 12) + 1;

  checkDiceRoll(DICE_ROLL);

  //which index of the wall is the beggining of the dead wall length -7 ;p
  console.log(DICE_ROLL);
}

export default WallCalculation;
