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
import {isRyanpeikou} from './isRyanpeikou';
import {isRyuuiisou} from './isRyuuiisou';
import {isSanankou} from './isSanankou';
import {isSanshokuDoujun} from './isSanshokuDoujun';
import {isSanshokuDoukou} from './isSanshokuDoukou';
import {isShousangen} from './isShousangen';
import {isShousuushii} from './isShousuushii';
import {isTanyao} from './isTanyao';
import {isTsuuiisou} from './isTsuuiisou';

type testFunctionTypes = {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds?: TstolenTiles[];
};

export let handExample: TTileObject[] = [
  {
    name: 'circles1',
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
    name: 'circles1',
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
    name: 'circles1',
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
    name: 'circles3',
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
    name: 'circles3',
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
    name: 'circles3',
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
    name: 'circles5',
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
    name: 'circles5',
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
    name: 'bamboo6',
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
    name: 'bamboo1',
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
    name: 'bamboo2',
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
    name: 'bamboo3',
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

export const testFunction = () => {
  let result = isSanankou({
    hand: handExample,
    discard: discardExample,
    playerMelds: [],
  });
  console.log(
    'testFunction:',
    result,
    handExample.map(t => t.name),
    discardExample[0].name,
    handExample.length + discardExample.length,
  );
};
