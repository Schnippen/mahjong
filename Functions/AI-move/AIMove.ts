import store from "../../Store/store";
import { TTileObject } from "../../Types/types";
import { calculateDangerScore } from "./AI-Logic/calculateDangerScore";
import { calculateEfficiency } from "./AI-Logic/calculateEfficiency";
import calculateShanten from "./AI-Logic/calculateShanten";
import { chooseRandomTile } from "./AIChooseRandomTile";
import { getAllPossibleTilesAIThink } from "./getAllPossibleTilesAIThink";
import { getAllVisibleTilesAIThink } from "./getAllVisibleTilesAIThink";

export const determineBestDiscard = (hand:TTileObject[])=>{
    const start = performance.now();
    let gameTurn = store.getState().gameReducer.currentTurn;
    
    //be sure to pass the state as props to achieve better performance
   //current ai hand hand:TTileObject[]
    let player1Melds= store.getState().playersReducer.player1.playerHand.melds 
    let player2Melds= store.getState().playersReducer.player2.playerHand.melds 
    let player3Melds =store.getState().playersReducer.player3.playerHand.melds 
    let player4Melds =store.getState().playersReducer.player4.playerHand.melds 
    let player1RiverState= store.getState().riverReducer.player1River.riverState
    let player2RiverState= store.getState().riverReducer.player2River.riverState
    let player3RiverState= store.getState().riverReducer.player3River.riverState
    let player4RiverState= store.getState().riverReducer.player4River.riverState

    let {possibleTiles}=getAllPossibleTilesAIThink({hand,player1Melds,player2Melds,player3Melds,player4Melds,player1RiverState,
        player2RiverState,
        player3RiverState,
        player4RiverState,})    //possible tiles

        let {visibleTiles}=getAllVisibleTilesAIThink({hand,player1Melds,player2Melds,player3Melds,player4Melds,player1RiverState,
            player2RiverState,
            player3RiverState,
            player4RiverState,})


        let bestDiscard:TTileObject|null=null
        let bestScore=-Infinity
        //https://riichi.wiki/Shanten
        //Shanten refers to the minimum number of tiles required in order for a hand to reach tenpai. 
        hand.forEach(tile=>{
            //simulating discards
            const handAfterDiscard= hand.filter(t=>t!==tile)
            //calculating shanten after discard
            const shantenAfterDiscard= calculateShanten(handAfterDiscard)//number

            //calculating efficiency - how many tiles can complete the hand
            const efficiencyScore= calculateEfficiency(handAfterDiscard, possibleTiles)

            // penalizing discards that help opponents?!
            const dangerScore=calculateDangerScore(tile,possibleTiles,visibleTiles)

            //calculate final score for THIS tile discard option
            const discardScore=efficiencyScore-shantenAfterDiscard-dangerScore

            if(discardScore>bestScore){
                bestScore=discardScore
                bestDiscard=tile
            }
            console.log("AI MOVE BEST SCORE: ","shantendAfterDiscard:",shantenAfterDiscard,"efficiency:",efficiencyScore,"danger:",dangerScore,"discardScore:",discardScore,tile.name)
        })
        let randomTileToDiscard = chooseRandomTile(hand);

        const end = performance.now();
 /*  console.log(
    `AIMove() took ook ${end - start} milliseconds. - ${
      (end - start) / 1000
    } seconds`,
  ); */
    console.log("AIMOVE Automated choice:",bestDiscard!==null?bestDiscard?.name:`RandomTile:${randomTileToDiscard.name}`,`AIMove() took- ${
      (end - start) / 1000
    } seconds`,)
        return bestDiscard||randomTileToDiscard//hand[0] //this is fallback, better use
}