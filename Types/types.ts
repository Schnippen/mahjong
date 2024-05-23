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