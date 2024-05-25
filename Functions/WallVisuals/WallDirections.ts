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
