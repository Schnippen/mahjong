//const dora = [Man5_Dora, Pin5_Dora, Sou5_Dora];

import {TTileObject} from '../Types/types';

const mahjongTilesSVGBamboo = [
  'Sou1',
  'Sou2',
  'Sou3',
  'Sou4',
  'Sou5',
  'Sou6',
  'Sou7',
  'Sou8',
  'Sou9',
];
//jihai honor tiles/word tiles  //man 萬  //筒 pin //索 sou
const winds = []; //kazehai //east=ton //south=nan //west=shaa //north=pei
const dragons = []; //sangenpai  //haku=white //hatsu=green //chun=red

const exampleTileObject = {
  name: 'bamboo1',
  type: 'bamboo',
  state: 'drawn',
  value: 1,
  japaneseName: 'souzu1',
  image: 'svg',
  isDora: false,
  tileID: 1,
};
export const createTilesObjects = () => {
  const allTiles: TTileObject[] = [];
  const dragonSymbol = ['白', '發', '中'];
  const windSymbol = ['東', '南', '西', '北'];
  const bamboo = []; //Souzu
  const circles = []; //Pinzu
  const characters = []; //Manzu
  const whiteDragon = []; //haku
  const greenDragon = []; //hatsu
  const redDragon = []; //chun
  const eastWind = []; //ton
  const southWind = []; //nan
  const westWind = []; //shaa
  const northWind = []; //pei
  let IDindex = 1;
  for (let index = 0; index < 3; index++) {
    let currentName =
      index === 0 ? 'bamboo' : index === 1 ? 'circles' : 'characters';

    let currentNameJapanese =
      index === 0 ? 'douzu' : index === 1 ? 'pinzu' : 'manzu';

    for (let i = 0; i < 4; i++) {
      let suitName = currentName;
      let suitJapaneseName = currentNameJapanese;
      for (let j = 0; j < 9; j++) {
        let tileObject = {
          name: suitName + (j + 1),
          type: currentName,
          value: j + 1,
          state: '',
          helperNumber: (j + 1).toString(),
          japaneseName: suitJapaneseName + (j + 1),
          image: mahjongTilesSVGBamboo[j],
          isDora: false,
          tileID: IDindex,
        };
        if (index === 0) {
          bamboo.push(tileObject);
        } else if (index === 1) {
          circles.push(tileObject);
        } else if (index === 2) {
          characters.push(tileObject);
        }
        IDindex++;
      }
    }
  }
  for (let z = 0; z < 3; z++) {
    let currentName = z === 0 ? 'white' : z === 1 ? 'green' : 'red';
    let currentNameJapanese = z === 0 ? 'haku' : z === 1 ? 'hatsu' : 'chun';

    let suitName = currentName;
    let suitJapaneseName = currentNameJapanese;
    for (let j = 0; j < 4; j++) {
      let tileObject = {
        name: suitName + (j + 1),
        value: currentName,
        type: currentName,
        state: '',
        helperNumber: z === 0 ? 'white' : z === 1 ? 'green' : 'red',
        japaneseName: suitJapaneseName + (j + 1),
        image: mahjongTilesSVGBamboo[j],
        isDora: false,
        tileID: IDindex,
      };
      if (z === 0) {
        whiteDragon.push(tileObject);
      } else if (z === 1) {
        greenDragon.push(tileObject);
      } else if (z === 2) {
        redDragon.push(tileObject);
      }
      IDindex++;
    }
  }
  for (let z = 0; z < 4; z++) {
    let currentName =
      z === 0 ? 'east' : z === 1 ? 'south' : z === 2 ? 'west' : 'north';

    let currentNameJapanese =
      z === 0 ? 'ton' : z === 1 ? 'nan' : z === 2 ? 'shaa' : 'pei';

    let suitName = currentName;
    let suitJapaneseName = currentNameJapanese;

    for (let j = 0; j < 4; j++) {
      let tileObject = {
        name: suitName + (j + 1),
        value: currentName,
        type: currentName,
        state: '',
        helperNumber: currentName,
        japaneseName: suitJapaneseName + (j + 1),
        image: mahjongTilesSVGBamboo[j], // Assuming you have this array defined elsewhere
        isDora: false,
        tileID: IDindex,
      };

      if (z === 0) {
        eastWind.push(tileObject);
      } else if (z === 1) {
        southWind.push(tileObject);
      } else if (z === 2) {
        westWind.push(tileObject);
      } else if (z === 3) {
        northWind.push(tileObject);
      }

      IDindex++;
    }
  }
  const result = allTiles.concat(
    bamboo,
    circles,
    characters,
    whiteDragon,
    greenDragon,
    redDragon,
    eastWind,
    southWind,
    westWind,
    northWind,
  );
  console.log('Result:', result);
  console.log('Bamboo:', bamboo);
  console.log('Circles:', circles);
  console.log('Characters:', characters);

  console.log('whiteDragon:', whiteDragon);
  console.log('greenDragon:', greenDragon);
  console.log('redDragon:', redDragon);
  console.log('eastWind:', eastWind);
  console.log('southWind:', southWind);
  console.log('westWind:', westWind);
  console.log('northWind:', northWind);
  return result;
};
