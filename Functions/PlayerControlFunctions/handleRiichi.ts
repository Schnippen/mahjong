import { setRiichi } from "../../Store/playersReducer"
import { TplayerString } from "../../Types/types"

type handleRiichiTypes={
    dispatch:any
    player:TplayerString
}
//
export const handleRiichi=({dispatch,player}:handleRiichiTypes)=>{
    console.log("handleRiichi()")
    dispatch(setRiichi({player:player,val:true}))
    // change RiverState into object with key of river state and richii index
    //richi index will be displayed in river component 
    //set unique richii index in river, 
    //cannot richii if there is less than 4 tiles left
    //player must have at least 1000 points,
    //show riichii stick in compass
    //player who used riichii can only discard 14th tile
}