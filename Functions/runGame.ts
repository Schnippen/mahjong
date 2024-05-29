import playersReducer, { PlayersState } from "../Store/playersReducer"
import { TTileObject, TstolenTiles } from "../Types/types";


type TPlayers = Omit<PlayersState, 'assignHandsBasedOnWind'>;
export const runGame=({ player1, player2, player3, player4 }: TPlayers)=>{
    //ustalamy czyja jest tura
    let currentPlayersTurn =''
    let currentGlobalWind="east"
    if(player1.wind===currentGlobalWind){
        currentPlayersTurn="player1"
    }else if(player2.wind===currentGlobalWind){
        currentPlayersTurn="player2"
    }else if(player3.wind===currentGlobalWind){
        currentPlayersTurn="player3"
    }else if(player4.wind===currentGlobalWind){
        currentPlayersTurn="player4"
    }else(console.error("none of the players"))

    let currentPlayers = "player that has east as a wind makes first move,"

/*     if(players hand is ===14){
        do not draw tile
    }else{draw tile}
 */
   //discard the tile
  // tile discarded=

  // wait for all the checks of the possible stealSequences. 

//if there are any display them 
//wait for respone from all players than continue 
//for each players hand run check for melds, when all pass then go

//if response 
//steal tile and change the global turn, return function
//some global variable that will be run as middleware or useEffect, maybe game clock 

// as a new instance runGame() again?

  // continue with changing the turn 

}