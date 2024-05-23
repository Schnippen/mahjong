export interface TTileObject {
  name: string;
  type: string;
  state: string;
  value: number | string;
  helperNumber: string;
  japaneseName: string;
  image: string;
  isDora: boolean;
  tileID: number;
}


export interface TstolenTiles{
  name:string,
  tiles:TTileObject[],
  isOpen:boolean
}


//showHand: [{"name": "south3", "tileID": 127, "type": "south", "value": "south"}, {"name": "characters7", "tileID": 97, "type": "characters", "value": 7}, {"name": "bamboo8", "tileID": 35, "type": "bamboo", "value": 8}, {"name": "bamboo1", "tileID": 28, "type": "bamboo", "value": 1}, {"name": "circles6", "tileID": 51, "type": "circles", "value": 6}, {"name": "bamboo7", "tileID": 34, "type": "bamboo", "value": 7}, {"name": "characters7", "tileID": 106, "type": "characters", "value": 7}, {"name": "circles2", "tileID": 47, "type": "circles", "value": 2}, {"name": "circles1", "tileID": 55, "type": "circles", "value": 1}, {"name": "circles2", "tileID": 38, "type": "circles", "value": 2}, {"name": "characters7", "tileID": 79, "type": "characters", "value": 7}, {"name": "circles3", "tileID": 39, "type": "circles", "value": 3}, {"name": "characters5", "tileID": 104, "type": "characters", "value": 5}]