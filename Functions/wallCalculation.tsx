import {
  setDeadWallFragment,
  setDiceRollState,
  setDorasFromDeadWall,
  setTilesAfterHandout,
  setWallFragment,
} from '../Store/wallReducer';
import {TTileObject} from '../Types/types';
import {updateAfterHandOut} from '../Store/handReducer';

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
function filterOutMatchingObjects(
  arrayToFilter: TTileObject[],
  arrayToCheckAgainst: TTileObject[],
) {
  return arrayToFilter.filter(
    item =>
      !arrayToCheckAgainst.some(otherItem => compareObjects(item, otherItem)),
  );
}
function compareObjects(obj1: TTileObject, obj2: TTileObject) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

//shuffled
/*   const allWallTiles = 136;
  const EastPlayer = 34; //1 index=2   5=index=10  9=index=18
  const SouthPlayer = 34; //2 index=4  6=index=12  10=index=20
  const WestPlayer = 34;  //3=index=6  7=index=14  11=index=22
  const NorthPlayer = 34; */ //4=index=8 8=index=16 12=index=24
//should it be hardcoded?

const WallCalculation = (dispatch: any, shuffledTiles: TTileObject[]) => {
  //  const dispatch = useDispatch();
  //const finishedWall: TTileObject[] = store.getState().wallReducer.wallTilesArray;
  const shuffledWall = shuffledTiles;
  const DICE_ROLL =
    Math.floor(Math.random() * 6) + 1 + (Math.floor(Math.random() * 6) + 1);
  const currentDiceRoll = DICE_ROLL;
  let deadWallFragment: TTileObject[] = [];
  let wallWithoutDeadWall = [];
  let eastWall: TTileObject[] = [];
  let southWall: TTileObject[] = [];
  let westWall: TTileObject[] = [];
  let northWall: TTileObject[] = [];
  let handedoutTiles: TTileObject[] = [];
  let tilesReadyForRound: TTileObject[] = [];
  let doras: TTileObject[] = [];
  let firstHand: TTileObject[] = [];
  let secondHand: TTileObject[] = [];
  let thirdHand: TTileObject[] = [];
  let fourthHand: TTileObject[] = [];
  if (DICE_ROLL === 1) {
    deadWallFragment = deadWallFragment.concat(
      shuffledWall.slice(shuffledWall.length - 12),
      shuffledWall.slice(0, 2),
    );
  }
  if (DICE_ROLL === 2) {
    deadWallFragment = deadWallFragment.concat(
      shuffledWall.slice(shuffledWall.length - 10, shuffledWall.length),
      shuffledWall.slice(0, 4),
    );
  }
  if (DICE_ROLL === 3) {
    deadWallFragment = deadWallFragment.concat(
      shuffledWall.slice(shuffledWall.length - 8, shuffledWall.length),
      shuffledWall.slice(0, 6),
    );
  }
  if (DICE_ROLL === 4) {
    deadWallFragment = deadWallFragment.concat(
      shuffledWall.slice(shuffledWall.length - 6, shuffledWall.length),
      shuffledWall.slice(0, 8),
    );
  }
  if (DICE_ROLL === 5) {
    deadWallFragment = deadWallFragment.concat(
      shuffledWall.slice(shuffledWall.length - 4, shuffledWall.length),
      shuffledWall.slice(0, 10),
    );
  }
  if (DICE_ROLL === 6) {
    deadWallFragment = deadWallFragment.concat(
      shuffledWall.slice(shuffledWall.length - 2, shuffledWall.length),
      shuffledWall.slice(0, 12),
    );
  }
  if (DICE_ROLL === 7) {
    deadWallFragment = shuffledWall.slice(0, 14);
  }
  if (DICE_ROLL === 8) {
    deadWallFragment = shuffledWall.slice(2, 16);
  }
  if (DICE_ROLL === 9) {
    deadWallFragment = shuffledWall.slice(4, 18);
  }
  if (DICE_ROLL === 10) {
    deadWallFragment = shuffledWall.slice(6, 20);
  }
  if (DICE_ROLL === 11) {
    deadWallFragment = shuffledWall.slice(8, 22);
  }
  if (DICE_ROLL === 12) {
    deadWallFragment = shuffledWall.slice(10, 24);
  }
  //changing state of deadWallFragment tiles
  deadWallFragment.forEach(tile => {
    tile.state = 'deadwall';
  });

  wallWithoutDeadWall = filterOutMatchingObjects(
    shuffledTiles,
    deadWallFragment,
  );
  //east
  firstHand = firstHand.concat(
    wallWithoutDeadWall.slice(0, 4), //1
    wallWithoutDeadWall.slice(16, 20), //2
    wallWithoutDeadWall.slice(32, 36), //3
    wallWithoutDeadWall.slice(48, 49), // extra
    wallWithoutDeadWall.slice(52, 53), // extra
  );
  //south
  secondHand = secondHand.concat(
    wallWithoutDeadWall.slice(4, 8),
    wallWithoutDeadWall.slice(20, 24),
    wallWithoutDeadWall.slice(36, 40),
    wallWithoutDeadWall.slice(49, 50),
  );
  //west
  thirdHand = thirdHand.concat(
    wallWithoutDeadWall.slice(8, 12),
    wallWithoutDeadWall.slice(24, 28),
    wallWithoutDeadWall.slice(40, 44),
    wallWithoutDeadWall.slice(50, 51),
  );
  //north
  fourthHand = fourthHand.concat(
    wallWithoutDeadWall.slice(12, 16),
    wallWithoutDeadWall.slice(28, 32),
    wallWithoutDeadWall.slice(44, 48),
    wallWithoutDeadWall.slice(51, 52),
  );
  handedoutTiles = handedoutTiles.concat(
    ...firstHand,
    ...secondHand,
    ...thirdHand,
    ...fourthHand,
  );
  tilesReadyForRound = wallWithoutDeadWall.slice(
    53,
    wallWithoutDeadWall.length,
  );
  //changing state of tilesReadyForRound to wall
  tilesReadyForRound.forEach(tile => {
    tile.state = 'wall';
  });
  doras = doras.concat(
    deadWallFragment[5],
    deadWallFragment[7],
    deadWallFragment[9],
    deadWallFragment[11],
    deadWallFragment[13],
  );
  doras[0].isDora = true;
  /*   tilesReadyForRound = wallWithoutDeadWall.filter((tile: TTileObject) => !handedoutTiles.some((handedoutTile: TTileObject) => handedoutTile.tileID === tile.tileID)); */
  //console.log('calcL:', player1Hand.length);
  dispatch(setDeadWallFragment(deadWallFragment));
  dispatch(setDorasFromDeadWall({tiles: doras}));
  console.log('deadWall:', deadWallFragment.length);
  /*   console.log('dorasLength:', doras.length);
  console.log(
    'firstHand:',
    firstHand.map(item => item.tileID),
    'secondHand:',
    secondHand.map(item => item.tileID),
    'thirdHand:',
    thirdHand.map(item => item.tileID),
    'fourthHand:',
    fourthHand.map(item => item.tileID),
  ); */
  dispatch(updateAfterHandOut({player: 'firstHand', tile: firstHand}));
  dispatch(updateAfterHandOut({player: 'secondHand', tile: secondHand}));
  dispatch(updateAfterHandOut({player: 'thirdHand', tile: thirdHand}));
  dispatch(updateAfterHandOut({player: 'fourthHand', tile: fourthHand}));
  //tilesReadyfor Round are the tiles that constitute wall to display
  dispatch(setTilesAfterHandout(tilesReadyForRound));
  dispatch(setDiceRollState(currentDiceRoll));
  //console.log('dice_roll:', DICE_ROLL, currentDiceRoll);
  console.log('wallWithoutDeadWall:', wallWithoutDeadWall.length);
  console.log('tilesReadyForRound:', tilesReadyForRound.length);
  //now set up wall position //53 tiles on hand, 14 in dead wall = 67
  checkDiceRoll(currentDiceRoll);
  eastWall = tilesReadyForRound.slice(0, 11);
  southWall = []; //2*2 dead wall deadWallFragment.slice(0,4)
  westWall = tilesReadyForRound.slice(45, 69); //5*2 dead wall deadWallFragment.slice(4,14)
  northWall = tilesReadyForRound.slice(11, 45);
  /*   let array: TTileObject[] = [];
  console.log(
    'dead:',
    deadWallFragment.map(i => i.name),
    'east:',
    eastWall.map(i => i.name),

    'south:',
    southWall.map(i => i.name),
    'southWITHdead:',
    southWall.concat(deadWallFragment.slice(0, 4)).map(i => i.name),
    'west:',
    westWall.map(i => i.name),
    'westWITHdead:',
    westWall.concat(deadWallFragment.slice(4, 14)).map(i => i.name),
    'arrayConcat:',
    array
      .concat(deadWallFragment.slice(4, 14), tilesReadyForRound.slice(45, 69))
      .map(i => i.name),
  ); */ // dead wall ist first to grab ; /
  let array: TTileObject[] = [];
  if (DICE_ROLL === 2) {
    //2 south //5 west
    eastWall = tilesReadyForRound.slice(0, 11);
    southWall = deadWallFragment.slice(0, 4); //2*2 dead wall
    westWall = array.concat(
      deadWallFragment.slice(4, 14),
      tilesReadyForRound.slice(45, 69),
    ); //5*2 dead wall deadWallFragment.slice(4,14)
    northWall = tilesReadyForRound.slice(11, 45);
  }
  if (DICE_ROLL === 3) {
    //3 west 4 north
    eastWall = tilesReadyForRound.slice(9, 43);
    southWall = tilesReadyForRound.slice(0, 9);
    westWall = deadWallFragment.slice(0, 6); //3*2 deadwall
    northWall = array.concat(
      deadWallFragment.slice(6, 14),
      tilesReadyForRound.slice(43, 69),
    ); // 4*2 dead wall
  }
  if (DICE_ROLL === 4) {
    //4 north  / 3 east
    eastWall = array.concat(
      deadWallFragment.slice(8, 14),
      tilesReadyForRound.slice(41, 69),
    ); //3*2 dead wall
    southWall = tilesReadyForRound.slice(7, 41);
    westWall = tilesReadyForRound.slice(0, 7);
    northWall = deadWallFragment.slice(0, 8); //4*2 dead wall
  }
  if (DICE_ROLL === 5) {
    //5 east /2 south
    eastWall = deadWallFragment.slice(0, 10); //5*2 dead wall
    southWall = array.concat(
      deadWallFragment.slice(10, 14),
      tilesReadyForRound.slice(39, 69),
    ); //2*2 dead wall
    westWall = tilesReadyForRound.slice(5, 37);
    northWall = tilesReadyForRound.slice(0, 5);
  }
  if (DICE_ROLL === 6) {
    //6 south //1 west
    eastWall = tilesReadyForRound.slice(0, 3);
    southWall = deadWallFragment.slice(0, 12); //6*2 dead wall
    westWall = array.concat(
      deadWallFragment.slice(12, 14),
      tilesReadyForRound.slice(37, 69),
    ); //1*2 dead wall
    northWall = tilesReadyForRound.slice(3, 37);
  }
  if (DICE_ROLL === 7) {
    //WEST
    //7 west
    eastWall = tilesReadyForRound.slice(1, 35); // east full
    southWall = tilesReadyForRound.slice(0, 1); // 1 left,
    westWall = deadWallFragment; //DEAD WALL is from 0 to 14
    northWall = tilesReadyForRound.slice(35, 69); //north full
  }
  if (DICE_ROLL === 8) {
    //rest 7 south /1 south
    eastWall = tilesReadyForRound.slice(33, 67);
    southWall = tilesReadyForRound.slice(0, 33);
    westWall = [];
    northWall = array.concat(
      deadWallFragment,
      tilesReadyForRound.slice(67, 69),
    ); //7*2 dead wall
  }
  if (DICE_ROLL === 9) {
    eastWall = array.concat(deadWallFragment, tilesReadyForRound.slice(65, 69)); //2*2 dead wall
    southWall = tilesReadyForRound.slice(31, 65);
    westWall = tilesReadyForRound.slice(0, 31);
    northWall = [];
  }
  if (DICE_ROLL === 10) {
    //SOUTH
    eastWall = []; //empty
    southWall = array.concat(
      deadWallFragment,
      tilesReadyForRound.slice(63, 69),
    ); //3*2 dead wall
    westWall = tilesReadyForRound.slice(29, 63);
    northWall = tilesReadyForRound.slice(0, 29);
  }
  if (DICE_ROLL === 11) {
    //WEST
    eastWall = tilesReadyForRound.slice(0, 27);
    southWall = [];
    westWall = array.concat(deadWallFragment, tilesReadyForRound.slice(61, 69)); //4*2 dead wall
    northWall = tilesReadyForRound.slice(27, 61);
  }
  if (DICE_ROLL === 12) {
    //NORTH
    eastWall = tilesReadyForRound.slice(25, 59); //empty
    southWall = tilesReadyForRound.slice(0, 25);
    westWall = [];
    northWall = array.concat(
      deadWallFragment,
      tilesReadyForRound.slice(59, 69),
    ); //5*2 dead wall + 7*2
  }
  dispatch(setWallFragment({direction: 'east', tiles: eastWall}));
  dispatch(setWallFragment({direction: 'south', tiles: southWall}));
  dispatch(setWallFragment({direction: 'west', tiles: westWall}));
  dispatch(setWallFragment({direction: 'north', tiles: northWall}));
  console.log(
    'eastWall:',
    eastWall.length,
    'southWall:',
    southWall.length,
    'westWall:',
    westWall.length,
    'northWall:',
    northWall.length,
    'sum:',
    eastWall.length + southWall.length + westWall.length + northWall.length,
  );
  /* console.log("shuffledWall:",shuffledWall.length)
  console.log("deadWallFragment:",deadWallFragment.length, "wallWithoutDeadWall:",wallWithoutDeadWall.length)
  console.log("player1Hand:",player1Hand.length, "player2Hand:",player2Hand.length,"player3Hand:",player3Hand.length,"player4Hand:",player4Hand.length)
  console.log("handedoutTiles:",handedoutTiles.length)
  console.log("tilesReadyForRound:",tilesReadyForRound.length)
  console.log(tilesReadyForRound.length) */
  //console.log("tilesReadyForRounderror:",JSON.stringify(wallWithoutDeadWall))
};
//TODO player that have 14 tiles starts game
export default WallCalculation;
