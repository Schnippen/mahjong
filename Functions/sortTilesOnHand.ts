import {TTileObject} from '../Types/types';

export const customSort = (a: TTileObject, b: TTileObject) => {
  //const start = performance.now();
  // First sort by type
  if (a.type < b.type) return -1;
  if (a.type > b.type) return 1;

  // If types are the same, sort by value
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;

  // If both type and value are equal, sort by tileID
  if (a.tileID < b.tileID) return -1;
  if (a.tileID > b.tileID) return 1;

  //const end = performance.now();
  /* console.log(
    `customSort() took ${end - start} milliseconds. ${
      (end - start) / 1000
    } seconds`,
  ); */
  return 0; // If types, values, and tileIDs are equal
};
