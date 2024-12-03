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

type StolenType = 'Chii' | 'Pon' | 'Kan';

export interface TstolenTiles {
  name: string;
  tiles: TTileObject[];
  isOpen: boolean;
  type: StolenType;
}

export type TplayerString =
  | 'player1'
  | 'player2'
  | 'player3'
  | 'player4'
  | 'null';

export type WindTypes = 'east' | 'south' | 'west' | 'north' | 'null';

export interface tileCountsType {
  [key: string]: number;
}

export type TypeOfAction = 'TSUMO' | 'RON' | '';

export type VoicesTypes = 'OFF' | 'MALE' | 'FEMALE';

export interface SettingStoreTypes {
  sound: boolean;
  volume: number;
  voices: VoicesTypes;
  vibrations: boolean;
  numerals: boolean;
}

export type YakuType = {han: number; yakuName: string}; //TODO add enums with yaku names

export type positionType = 'left' | 'top' | 'right' | 'bottom';

export type kanPositionTypes =
  | 'kanClosed'
  | 'kanLeft'
  | 'kanFront'
  | 'kanRight';
export type GameWinds = 'east' | 'south' | 'west' | 'north';

export type pointsNameType =
  | 'Mangan'
  | 'Haneman'
  | 'Baiman'
  | 'Sanbaiman'
  | 'Yakuman'
  | '';

export type whoTheLoserIsType = {
  loserName: TplayerString;
  loserWind: WindTypes;
} | null;

export type PassActionFuncParam = {
  setDisplayChiiButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayPonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayKanButton: React.Dispatch<React.SetStateAction<boolean>>;
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayRiichiButton: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: any;
  displayChiiButton: boolean;
  nextTile: TTileObject;
  setDisplayRonButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTsumoButton: React.Dispatch<React.SetStateAction<boolean>>;
  displayKanButton: boolean;
  displayPonButton: boolean;
  playerWhoLeftTheTile:TplayerString;
}

//showHand: [{"name": "south3", "tileID": 127, "type": "south", "value": "south"}, {"name": "characters7", "tileID": 97, "type": "characters", "value": 7}, {"name": "bamboo8", "tileID": 35, "type": "bamboo", "value": 8}, {"name": "bamboo1", "tileID": 28, "type": "bamboo", "value": 1}, {"name": "circles6", "tileID": 51, "type": "circles", "value": 6}, {"name": "bamboo7", "tileID": 34, "type": "bamboo", "value": 7}, {"name": "characters7", "tileID": 106, "type": "characters", "value": 7}, {"name": "circles2", "tileID": 47, "type": "circles", "value": 2}, {"name": "circles1", "tileID": 55, "type": "circles", "value": 1}, {"name": "circles2", "tileID": 38, "type": "circles", "value": 2}, {"name": "characters7", "tileID": 79, "type": "characters", "value": 7}, {"name": "circles3", "tileID": 39, "type": "circles", "value": 3}, {"name": "characters5", "tileID": 104, "type": "characters", "value": 5}]
