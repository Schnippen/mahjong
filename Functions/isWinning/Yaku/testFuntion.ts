import {TTileObject, TstolenTiles} from '../../../Types/types';
import {isChanta} from './isChanta';
import {isChinitsu} from './isChinitsu';
import {isChinroutou} from './isChinroutou';
import {isChuurenPoutou} from './isChuurenPoutou';
import {isDaisangen} from './isDaisangen';
import {isHonitsu} from './isHonitsu';
import {isHonrotou} from './isHonrotou';
import {isIipeikou} from './isIipeikou';
import {isIttsuu} from './isIttsuu';
import {isJunchan} from './isJunchan';
import {isKokushiMusou} from './isKokushiMusou';
import {isPinfu} from './isPinfu';
import {isRyanpeikou} from './isRyanpeikou';
import {isRyuuiisou} from './isRyuuiisou';
import {isSanankou} from './isSanankou';
import {isSanshokuDoujun} from './isSanshokuDoujun';
import {isSanshokuDoukou} from './isSanshokuDoukou';
import {isShousangen} from './isShousangen';
import {isShousuushii} from './isShousuushii';
import {isTanyao} from './isTanyao';
import {isTsuuiisou} from './isTsuuiisou';
import {tilesData} from '../../../Data/tilesData';
import {tilesData2} from '../../../Data/tilesData2';
import {
  changePrevailingWind,
  DEBUG_HAND,
  rotateWindOrder,
} from '../../../Store/playersReducer';
import {checkWinningHand} from '../../isReadyForRiichii/checkingWinningHand';
import {soundFunc} from '../../playSounds/soundFunc';
import {addRoundCounter, START_GAME} from '../../../Store/gameReducer';
import {isToiToi} from './isToiToi';
type testFunctionTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds?: TstolenTiles[];
};

export let handExample: TTileObject[] = [
  {
    name: 'characters1',
    type: 'characters',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'manzu1',
    isDora: false,
    tileID: 82,
    image: '',
  },
  {
    name: 'characters2',
    type: 'characters',
    value: 2,
    state: '',
    helperNumber: '2',
    japaneseName: 'manzu2',
    isDora: false,
    tileID: 83,
    image: '',
  },
  {
    name: 'characters3',
    type: 'characters',
    value: 3,
    state: '',
    helperNumber: '3',
    japaneseName: 'manzu3',
    isDora: false,
    tileID: 84,
    image: '',
  },
  {
    name: 'bamboo2',
    type: 'bamboo',
    value: 7,
    state: '',
    helperNumber: '7',
    japaneseName: 'douzu7',
    isDora: false,
    tileID: 34,
    image: '',
  },
  {
    name: 'bamboo3',
    type: 'bamboo',
    value: 8,
    state: '',
    helperNumber: '8',
    japaneseName: 'douzu8',
    isDora: false,
    tileID: 35,
    image: '',
  },
  {
    name: 'bamboo4',
    type: 'bamboo',
    value: 9,
    state: '',
    helperNumber: '9',
    japaneseName: 'douzu9',
    isDora: false,
    tileID: 36,
    image: '',
  },
  {
    name: 'bamboo7',
    type: 'circles',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'pinzu1',
    isDora: false,
    tileID: 37,
    image: '',
  },
  {
    name: 'bamboo8',
    type: 'circles',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'pinzu1',

    isDora: false,
    tileID: 46,
    image: '',
  },
  {
    name: 'circles5',
    type: 'circles',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'pinzu1',
    isDora: false,
    tileID: 55,
    image: '',
  },
  {
    name: 'circles6',
    type: 'characters',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'manzu1',
    isDora: false,
    tileID: 82,
    image: '',
  },
  {
    name: 'circles7',
    type: 'characters',
    value: 2,
    state: '',
    helperNumber: '2',
    japaneseName: 'manzu2',
    isDora: false,
    tileID: 83,
    image: '',
  },
  {
    name: 'circles9',
    type: 'characters',
    value: 3,
    state: '',
    helperNumber: '3',
    japaneseName: 'manzu3',
    isDora: false,
    tileID: 84,
    image: '',
  },
  {
    name: 'circles9',
    type: 'characters',
    value: 9,
    state: '',
    helperNumber: '9',
    japaneseName: 'manzu9',

    isDora: false,
    tileID: 90,
    image: '',
  },
];

export let discardExample = [
  {
    name: 'bamboo6',
    type: 'characters',
    value: 9,
    state: '',
    helperNumber: '9',
    japaneseName: 'manzu9',
    isDora: false,
    tileID: 99,
    image: '',
  },
];

let debugHand1 = handExample;
export let debugHand3 = [
  tilesData2[82],
  tilesData2[83],
  tilesData2[84],
  tilesData[67],
  tilesData[68],
  tilesData[69],
  tilesData[2],
  tilesData[3],
  tilesData[4],
  tilesData[6],
  tilesData[15],
  tilesData[7],
  tilesData[8],
];
export let debugHand2 = [
  //toitoi
  tilesData2[47],
  tilesData2[38],
  tilesData2[25],
  tilesData[16],
  tilesData[7],
  tilesData[62],
  tilesData[71],
  tilesData[44],
  tilesData[50],
  tilesData[41],
  tilesData[120],
  tilesData[121],
  tilesData[122],
];
export let hand = [
  tilesData2[47],
  tilesData2[38],
  tilesData2[25],
  tilesData[16],
  tilesData[7],
  tilesData[62],
  tilesData[71],
  tilesData[44],
  tilesData[50],
  tilesData[41],
];
let discard = [tilesData[65]];
let playerMelds: TstolenTiles[] = [
  {
    isOpen: true,
    name: 'kanLeft',
    tiles: [tilesData[120], tilesData[121], tilesData[122], tilesData[123]],
    type: 'Kan',
  },
];

//[{"isOpen": true, "name": "kanLeft", "tiles": [ tilesData[120],tilesData[121],  tilesData[122], tilesData[123],], "type": "Kan"}]
//pinfu tenpai //debugHand2.map(i => i.tileID),
/*   debugHand2.concat(tilesData[6]).map(t => t.name),
    tilesData[6].name,
    checkWinningHand(winningDebugHand), */
//let winningDebugHand = debugHand2.concat(tilesData[6]);
//test multiple Chii more than 2
//test score calculation
let {han, result, typeOfAction, winningTile, yakuName} = isToiToi({
  hand,
  discard,
  playerMelds,
  Process: 'ron',
});
export const testFunction = (dispatch: any, navigation: any) => {
  console.log('TEST_FUNCTION:');

  han;
  result;
  typeOfAction;
  winningTile;
  yakuName;
  /*  console.log(
    debugHand2.map(t => `${t.name} ${t.tileID}`),
    debugHand2.length,
  ); */
  /*   console.log(
    'Test Hand:',
    playerMelds[0].tiles.map(t => t.name),
    hand.map(t => t.name),
    discard.map(t => t.name),
  );
  isToiToi({
    hand,
    discard,
    playerMelds,
    Process: 'ron',
  });
  // Log isToiToi results
  console.log('ToiToi Check Results:', {
    han,
    result,
    typeOfAction,
    winningTile: winningTile
      ? `${winningTile.name} (ID: ${winningTile.tileID})`
      : null,
    yakuName,
  }); */
};
