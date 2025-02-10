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
export type TactivePlayerString = Exclude<TplayerString, 'null'>;

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
export type GameWinds = 'east' | 'south' | 'west' | 'north' | 'null';
export type YakuCheckType = {
  result: boolean;
  typeOfAction: TypeOfAction;
  han: number;
  yakuName: string;
  winningTile: TTileObject;
};
export type YakuCheckFunction = (args: {
  hand: TTileObject[];
  discard: TTileObject[];
  playerMelds: TstolenTiles[];
  Process?: 'ron' | 'tsumo';
}) => YakuCheckType;
export type pointsNameType =
  | 'Mangan'
  | 'Haneman'
  | 'Baiman'
  | 'Sanbaiman'
  | 'Yakuman'
  | ''; //TODO ADD double yakuman???

export type whoTheLoserIsType = {
  loserName: TplayerString;
  loserWind: WindTypes;
  paymentMultiplier: number;
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
  playerWhoLeftTheTile: TplayerString;
  player1Hand: TTileObject[];
  player1Melds: TstolenTiles[];
  player2Melds: TstolenTiles[];
  player3Melds: TstolenTiles[];
  player4Melds: TstolenTiles[];
  player1RiverState: TTileObject[];
  player2RiverState: TTileObject[];
  player3RiverState: TTileObject[];
  player4RiverState: TTileObject[];
  player1RiichiIndex: number | null;
};

//use enum? NO!
/* Enums add overhead in runtime as they are compiled into objects. Use unions for lightweight alternatives. Faster (no runtime object) */
export type IsTenpaiResult = {
  result: boolean;
  discardableTiles: Set<TTileObject>;
};

//navigation types
export type ScreenList =
  | 'StartGameScreen'
  | 'MahjongScreen'
  | 'EndRoundScreen'
  | 'SettingsScreen'
  | 'RulesScreen'
  | 'RulesScreenYakuExample'
  | 'ScoresScreen';
export type WinningHandType = {
  hand: TTileObject[];
  winningTile: TTileObject[];
  yakuList: YakuType[];
  winningAction: 'TSUMO' | 'RON' | '';
  points: number;
  pointsName: pointsNameType;
  fu: number;
  totalHan: number;
  isRichiiActive: boolean;
};
/* export type RootStackParamList = {
  MahjongScreen: {gameInitializer: string};
  StartGameScreen: {gameInitializer: string};
  EndRoundScreen: undefined;
  SettingsScreen: undefined;
  RulesScreen: undefined;
  RulesScreenYakuExample: {name: string; data: TTileObject[]};
  };*/
//redux store:
export type TWhoTheWinnerIs = {
  playerName: TplayerString;
  winnersWind: WindTypes;
  originalEastPlayer: TplayerString;
  eastRoundCounter: number;
  prevailingWind: WindTypes;
  honba: number;
  whoTheLoserIs: whoTheLoserIsType[];
};
