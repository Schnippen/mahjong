import { TTileObject, TstolenTiles } from "../../../Types/types";
import { isDaisangen } from "./isDaisangen";
import { isIipeikou } from "./isIipeikou";
import { isIttsuu } from "./isIttsuu";
import { isJunchan } from "./isJunchan";
import { isRyanpeikou } from "./isRyanpeikou";
import { isSanshokuDoujun } from "./isSanshokuDoujun";
import { isShousangen } from "./isShousangen";
import { isShousuushii } from "./isShousuushii";
import { isTanyao } from "./isTanyao";

type testFunctionTypes = {
    hand: TTileObject[];
    discard: TTileObject[];
    playerMelds?: TstolenTiles[];
  };

 export let handExample:TTileObject[] = [{
    name: 'red1',
    type: 'characters',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'manzu1',
    isDora: false,
    tileID: 82,
  image:""},
  {
    name: 'red1',
    type: 'characters',
    value: 2,
    state: '',
    helperNumber: '2',
    japaneseName: 'manzu2',
    isDora: false,
    tileID: 83,
  image:""},
  {
    name: 'red1',
    type: 'characters',
    value: 3,
    state: '',
    helperNumber: '3',
    japaneseName: 'manzu3',
    isDora: false,
    tileID: 84,
  image:""},{
    name: 'green1',
    type: 'bamboo',
    value: 7,
    state: '',
    helperNumber: '7',
    japaneseName: 'douzu7',
    isDora: false,
    tileID: 34,
  image:""},
  {
    name: 'green1',
    type: 'bamboo',
    value: 8,
    state: '',
    helperNumber: '8',
    japaneseName: 'douzu8',
    isDora: false,
    tileID: 35,
  image:""},
  {
    name: 'green1',
    type: 'bamboo',
    value: 9,
    state: '',
    helperNumber: '9',
    japaneseName: 'douzu9',
    isDora: false,
    tileID: 36,
  image:""},
  {
    name: 'white1',
    type: 'circles',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'pinzu1',
    isDora: false,
    tileID: 37,
  image:""},{
    name: 'white1',
    type: 'circles',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'pinzu1',

    isDora: false,
    tileID: 46,
  image:""},{
    name: 'character2',
    type: 'circles',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'pinzu1',
    isDora: false,
    tileID: 55,
  image:""}, {
    name: 'character2',
    type: 'characters',
    value: 1,
    state: '',
    helperNumber: '1',
    japaneseName: 'manzu1',
    isDora: false,
    tileID: 82,
  image:""},
  {
    name: 'bamboo3',
    type: 'characters',
    value: 2,
    state: '',
    helperNumber: '2',
    japaneseName: 'manzu2',
    isDora: false,
    tileID: 83,
  image:""},
  {
    name: 'bamboo4',
    type: 'characters',
    value: 3,
    state: '',
    helperNumber: '3',
    japaneseName: 'manzu3',
    isDora: false,
    tileID: 84,
  image:""}, 
  {
    name: 'bamboo5',
    type: 'characters',
    value: 9,
    state: '',
    helperNumber: '9',
    japaneseName: 'manzu9',

    isDora: false,
    tileID: 90,
  image:""},]

  export let discardExample = [ {
    name: 'white1',
    type: 'characters',
    value: 9,
    state: '',
    helperNumber: '9',
    japaneseName: 'manzu9',
    isDora: false,
    tileID: 99,
    image:""
  },]

export const testFunction=()=>{
 let result = isShousuushii({hand:handExample, discard:discardExample, playerMelds: []})
 console.log("testFunction:",result, handExample.map(t=>t.name),discardExample[0].name)
}