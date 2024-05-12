import {Button} from '@rneui/themed';
import React from 'react';
import {Text, View} from 'react-native';

function Settings({navigation}: {navigation: any}) {
  return (
    <View>
      <Button onPress={() => navigation.goBack()} title={'GO BACK'}></Button>
      <Text>Settings</Text>
    </View>
  );
}

export default Settings;

//last tiles position in wall relative to wind

//it is south wall but the divide happens on west wall
// wallWind === 'south' && globalDiceRollResult ===2
// const isNearDeadwall = wallWind === 'south' && globalDiceRollResult === 2;

// wallWind === 'north' && globalDiceRollResult ===4
//justify-content flex-end  west
//Margin right west 4 tiles
// const isNearDeadwall = wallWind === 'north' && globalDiceRollResult === 4;

// wallWind === 'east' && globalDiceRollResult === 5
//isNearDeadwall = wallWind === 'east' && globalDiceRollResult === 5;
//justify-content flex-end  EAST
//Margin right SOUTH


//it is south wall but the divide happens on west wall
// wallWind === 'south' && globalDiceRollResult === 6
// const isNearDeadwall = wallWind === 'south' && globalDiceRollResult === 6

// wallWind === 'west' && globalDiceRollResult === 7
// const isNearDeadwall = wallWind === 'west' && globalDiceRollResult === 7
//justify-content flex-start WEST

// wallWind === 'north' && globalDiceRollResult ===8
//justify-content flex-end  North
//const isNearDeadwall = wallWind === 'north' && globalDiceRollResult === 8;

//Margin right NORTH 2 tiles
// wallWind === 'east' && globalDiceRollResult ===9
//justify-content flex-end  east
//Margin right east 3 tiles

// wallWind === 'south' && globalDiceRollResult ===10
//justify-content flex-end  west
//Margin right west 4 tiles
// const isNearDeadwall = wallWind === 'south' && globalDiceRollResult === 10;


// wallWind === 'west' && globalDiceRollResult ===11
//justify-content flex-end  west
//Margin right west 4 tiles
// const isNearDeadwall = wallWind === 'west' && globalDiceRollResult === 11;

// wallWind === 'north' && globalDiceRollResult ===12
//justify-content flex-end  north
//Margin right west 6 tiles
// const isNearDeadwall = wallWind === 'north' && globalDiceRollResult === 12;

// porposition of creating wall that will sit on the gameboard
/* 
  if (DICE_ROLL === 2) {
    //2 south //5 west

    eastWall = tilesReadyForRound.slice(0, 11);
    southWall = []; //2*2 dead wall deadWallFragment.slice(0,4)
    westWall = tilesReadyForRound.slice(45, 69); //5*2 dead wall deadWallFragment.slice(4,14)
    northWall = tilesReadyForRound.slice(11, 45);
  }
  if (DICE_ROLL === 3) {
    //3 west 4 north
    eastWall = tilesReadyForRound.slice(9, 43);
    southWall = tilesReadyForRound.slice(0, 9);
    westWall = []; //3*2 deadwall
    northWall = tilesReadyForRound.slice(43, 69); // 4*2 dead wall
  }
  if (DICE_ROLL === 4) {
    //4 north  / 3 east
    eastWall = tilesReadyForRound.slice(41, 69); //3*2 dead wall
    southWall = tilesReadyForRound.slice(7, 41);
    westWall = tilesReadyForRound.slice(0, 7);
    northWall = []; //4*2 dead wall
  }
  if (DICE_ROLL === 5) {
    //5 east /2 south
    eastWall = []; //5*2 dead wall
    southWall = tilesReadyForRound.slice(39, 69); //2*2 dead wall
    westWall = tilesReadyForRound.slice(5, 37);
    northWall = tilesReadyForRound.slice(0, 5);
  }
  if (DICE_ROLL === 6) {
    //6 south //1 west
    eastWall = tilesReadyForRound.slice(0, 3);
    southWall = []; //6*2 dead wall
    westWall = tilesReadyForRound.slice(37, 69); //1*2 dead wall
    northWall = tilesReadyForRound.slice(3, 37);
  }
  if (DICE_ROLL === 7) {
    //WEST
    //7 west
    eastWall = tilesReadyForRound.slice(1, 35); // east full
    southWall = tilesReadyForRound.slice(0, 1); // 1 left,
    westWall = []; //DEAD WALL is from 0 to 14
    northWall = tilesReadyForRound.slice(35, 69); //north full
  }
  if (DICE_ROLL === 8) {
    //rest 7 south /1 south
    eastWall = tilesReadyForRound.slice(33, 67);
    southWall = tilesReadyForRound.slice(0, 33);
    westWall = [];
    northWall = tilesReadyForRound.slice(67, 69); //7*2 dead wall
  }
  if (DICE_ROLL === 9) {
    eastWall = tilesReadyForRound.slice(65, 69); //2*2 dead wall
    southWall = tilesReadyForRound.slice(31, 65);
    westWall = tilesReadyForRound.slice(0, 31);
    northWall = [];
  }
  if (DICE_ROLL === 10) {
    //SOUTH
    eastWall = []; //empty
    southWall = tilesReadyForRound.slice(63, 69); //3*2 dead wall
    westWall = tilesReadyForRound.slice(29, 63);
    northWall = tilesReadyForRound.slice(0, 29);
  }
  if (DICE_ROLL === 11) {
    //WEST
    eastWall = tilesReadyForRound.slice(0, 27);
    southWall = [];
    westWall = tilesReadyForRound.slice(61, 69); //4*2 dead wall
    northWall = tilesReadyForRound.slice(27, 61);
  }
  if (DICE_ROLL === 12) {
    //NORTH
    eastWall = tilesReadyForRound.slice(25, 59); //empty
    southWall = tilesReadyForRound.slice(0, 25);
    westWall = [];
    northWall = tilesReadyForRound.slice(59, 69); //5*2 dead wall + 7*2
  } */
