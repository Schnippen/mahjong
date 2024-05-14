
const isNearDeadWallFunction =({wallWind,globalDiceRollResult}:{wallWind:string,globalDiceRollResult:number})=> {     
    let result = (wallWind === 'north' && globalDiceRollResult === 12) ||
    (wallWind === 'west' && globalDiceRollResult === 11)||
    (wallWind === 'south' && globalDiceRollResult === 10)||
    (wallWind === 'east' && globalDiceRollResult === 9) ||
    (wallWind === 'north' && globalDiceRollResult === 8) ||
    (wallWind === 'west' && globalDiceRollResult === 7) ||
    (wallWind === 'south' && globalDiceRollResult === 6)||
    (wallWind === 'east' && globalDiceRollResult === 5)||
    (wallWind === 'north' && globalDiceRollResult === 4)||
    (wallWind === 'west' && globalDiceRollResult === 3)||
    (wallWind === 'south' && globalDiceRollResult === 2) 
    return result
}


export default isNearDeadWallFunction
