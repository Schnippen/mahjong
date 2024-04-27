import {useDispatch, useSelector} from 'react-redux';
import store, {RootState} from '../Store/store';
import {setDeadWallFragment, setTilesAfterHandout, setWallFragment} from '../Store/wallReducer';
import { TTileObject } from '../Types/types';
import { updateHand } from '../Store/handReducer';
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
const finishedWall:TTileObject[] = useSelector(
  (state: RootState) => state.wallReducer.wallTilesArray,
); //shuffled
/*   const allWallTiles = 136;
  const EastPlayer = 34; //1 index=2   5=index=10  9=index=18
  const SouthPlayer = 34; //2 index=4  6=index=12  10=index=20
  const WestPlayer = 34;  //3=index=6  7=index=14  11=index=22
  const NorthPlayer = 34; */ //4=index=8 8=index=16 12=index=24
//should it be hardcoded?
const EastWall = finishedWall.slice(0, 34);
const SouthWall = finishedWall.slice(34, 68);
const WestWall = finishedWall.slice(68, 102);
const NorthWall = finishedWall.slice(102, 136);
const dispatch = useDispatch();
/*   dispatch(setWallFragment({direction: 'east', tiles: EastWall}));
  dispatch(setWallFragment({direction: 'south', tiles: SouthWall}));
  dispatch(setWallFragment({direction: 'west', tiles: WestWall}));
  dispatch(setWallFragment({direction: 'north', tiles: NorthWall})); */
function WallCalculation() {
  const DICE_ROLL = Math.floor(Math.random() * 12) + 1;
  let deadWallFragment:TTileObject[]=[]
  let wallWithoutDeadWall = []
  let player1Hand=[]
  let player2Hand=[]
  let player3Hand=[]
  let player4Hand=[]
  let handedoutTiles:TTileObject[]=[]
  let tilesReadyForRound:TTileObject[]=[]
  if(DICE_ROLL===1){    deadWallFragment = deadWallFragment.concat(finishedWall.slice(finishedWall.length-12), finishedWall.slice(0,2));
  }
  if(DICE_ROLL===2){   deadWallFragment.concat(finishedWall.slice(finishedWall.length-10),finishedWall.slice(0,4));}
  if(DICE_ROLL===3){  deadWallFragment.concat(finishedWall.slice(finishedWall.length-8),finishedWall.slice(0,6));}
  if(DICE_ROLL===4){deadWallFragment.concat(finishedWall.slice(finishedWall.length-6),finishedWall.slice(0,8))}
  if(DICE_ROLL===5){deadWallFragment.concat(finishedWall.slice(finishedWall.length-4),finishedWall.slice(0,10))}
  if(DICE_ROLL===6){deadWallFragment.concat(finishedWall.slice(finishedWall.length-2),finishedWall.slice(0,12))}
  if(DICE_ROLL===7){deadWallFragment=finishedWall.slice(0,14)}
  if(DICE_ROLL===8){deadWallFragment=finishedWall.slice(2,16)}
  if(DICE_ROLL===9){deadWallFragment=finishedWall.slice(4,18)}
  if(DICE_ROLL===10){deadWallFragment=finishedWall.slice(6,20)}
  if(DICE_ROLL===11){deadWallFragment=finishedWall.slice(8,22)}
  if(DICE_ROLL===12){deadWallFragment=finishedWall.slice(10,24)}
  wallWithoutDeadWall = finishedWall.filter((tile: TTileObject) => !deadWallFragment.some((deadTile: TTileObject) => deadTile.tileID === tile.tileID));
  //player1
  player1Hand.push(wallWithoutDeadWall.slice(0,4),wallWithoutDeadWall.slice(16,20),wallWithoutDeadWall.slice(32,36),wallWithoutDeadWall.slice(48,52),wallWithoutDeadWall.slice(64,65),wallWithoutDeadWall.slice(68,69))//64,65 68,69
  //player2
  player2Hand.push(wallWithoutDeadWall.slice(4,8),wallWithoutDeadWall.slice(20,24),wallWithoutDeadWall.slice(36,40),wallWithoutDeadWall.slice(52,56),wallWithoutDeadWall.slice(65,66))//65,66
  //player3
  player3Hand.push(wallWithoutDeadWall.slice(8,12),wallWithoutDeadWall.slice(24,28),wallWithoutDeadWall.slice(40,44),wallWithoutDeadWall.slice(56,60),wallWithoutDeadWall.slice(66,67))//66,67
  //player4
  player4Hand.push(wallWithoutDeadWall.slice(12,16),wallWithoutDeadWall.slice(28,32),wallWithoutDeadWall.slice(44,48),wallWithoutDeadWall.slice(48,52),wallWithoutDeadWall.slice(60,64),wallWithoutDeadWall.slice(67,68))//67,68
  handedoutTiles.concat(  
  ...player1Hand,
  ...player2Hand,
  ...player3Hand,
  ...player4Hand)
  tilesReadyForRound = wallWithoutDeadWall.filter((tile: TTileObject) => !handedoutTiles.some((handedoutTile: TTileObject) => handedoutTile.tileID === tile.tileID));
  dispatch(setDeadWallFragment(deadWallFragment));
  dispatch(updateHand({ player: "player1", tile: player1Hand }));
  dispatch(updateHand({ player: "player2", tile: player2Hand }));
  dispatch(updateHand({ player: "player3", tile: player3Hand }));
  dispatch(updateHand({ player: "player4", tile: player4Hand }));
  dispatch(setTilesAfterHandout(tilesReadyForRound))
  checkDiceRoll(DICE_ROLL);
  console.log("tilesReadyForRound:",tilesReadyForRound.length, "player1Hand:",player1Hand.length,"player2Hand:",player2Hand.length,"player3Hand:",player3Hand.length,"player4Hand:",player4Hand.length)
}

export default WallCalculation;
