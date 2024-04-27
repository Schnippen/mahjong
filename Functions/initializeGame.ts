import { TTileObject } from "../Types/types"
import { shuffledTilesForGameStart } from "./shuffledTilesForGameStart"
import WallCalculation from "./wallCalculation"

export const initialGame=(dispatch:any)=>{
    const finishedWall: TTileObject[]  = shuffledTilesForGameStart()
    WallCalculation(dispatch,finishedWall)
    //console.log("initializeGame:",finishedWall)
}