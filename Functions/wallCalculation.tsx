import {useDispatch, useSelector} from 'react-redux';
import store, {RootState} from '../Store/store';
function checkDiceRoll(roll:number){
    const EAST =[1,5,9]
    const SOUTH=[2,6,10]
    const WEST = [3,7,11]
    const NORTH = [4,8,12]
    if(EAST.includes(roll)){
        console.log("EAST");
    } else if (SOUTH.includes(roll)) {
        console.log("SOUTH");
    } else if (WEST.includes(roll)) {
        console.log("WEST");
    } else if (NORTH.includes(roll)) {
        console.log("NORTH");
    }
}


function WallCalculation(){
    const allWallTiles = 136;
    const EastPlayer = 34;
    const SouthPlayer = 34;
    const WestPlayer = 34;
    const NorthPlayer = 34;
    const DICE_ROLL =Math.floor(Math.random() * 12) + 1
    checkDiceRoll(DICE_ROLL)
    //which index of the wall is the beggining of the dead wall length -7 ;p
console.log(DICE_ROLL)
}

export default WallCalculation;
