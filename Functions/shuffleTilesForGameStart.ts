import {tilesData} from '../Data/tilesData';
export const shuffledTilesForGameStart = () => {
  return tilesData
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
};
