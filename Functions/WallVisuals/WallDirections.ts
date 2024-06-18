export const wallDirectionTOP = (
  globalDiceRollResult: number,
  wallWind: string,
) => {
  return (
    (globalDiceRollResult === 7 && wallWind === 'south') ||
    (globalDiceRollResult === 4 && wallWind === 'west') ||
    (globalDiceRollResult === 9 && wallWind === 'west') ||
    (wallWind === 'east' && globalDiceRollResult === 7) ||
    (wallWind === 'north' && globalDiceRollResult === 7) ||
    (wallWind === 'east' && globalDiceRollResult === 8) ||
    (globalDiceRollResult === 4 && wallWind === 'east') ||
    (globalDiceRollResult === 4 && wallWind === 'south') ||
    (globalDiceRollResult === 3 && wallWind === 'south') ||
    (globalDiceRollResult == 5 && wallWind === 'north') ||
    (globalDiceRollResult == 10 && wallWind === 'north') ||
    (globalDiceRollResult == 8 && wallWind === 'south') ||
    (globalDiceRollResult == 11 && wallWind === 'east') ||
    (globalDiceRollResult == 6 && wallWind === 'north') ||
    (globalDiceRollResult === 2 && wallWind === 'east') ||
    (globalDiceRollResult === 5 && wallWind === 'west') ||
    (globalDiceRollResult === 6 && wallWind === 'east') ||
    (globalDiceRollResult === 3 && wallWind === 'east')
  );
};

export const wallLeftAbsoluteLeft = (
  globalDiceRollResult: number,
  wallWind: string,
) => {
  return (
    (globalDiceRollResult === 6 && wallWind === 'south') ||
    (globalDiceRollResult === 9 && wallWind === 'east') ||
    (globalDiceRollResult === 8 && wallWind === 'north') ||
    (globalDiceRollResult === 11 && wallWind === 'west') ||
    (globalDiceRollResult === 3 && wallWind === 'west') ||
    (globalDiceRollResult === 5 && wallWind === 'east') ||
    (globalDiceRollResult === 4 && wallWind === 'north') ||
    (globalDiceRollResult === 12 && wallWind === 'north') ||
    (globalDiceRollResult === 10 && wallWind === 'south') ||
    (globalDiceRollResult === 7 && wallWind === 'west') ||
    (globalDiceRollResult === 2 && wallWind === 'south')
  );
};
/* globalDiceRollResult === 6 && wallWind === 'east'
    ? 0
    :  */
