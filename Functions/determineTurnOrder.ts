type TurnOrder = {
  [key: string]: string;
};
const determineTurnOrder = (
  playerBottom: string,
  playerRight: string,
  playerTop: string,
  playerLeft: string,
) => {
  const windOrder = ['east', 'south', 'west', 'north'];

  const playerWinds = [playerBottom, playerRight, playerTop, playerLeft];
  const playerPositions = ['bottom', 'right', 'top', 'left'];

  // Find the index of the East wind in the windOrder array
  const indexOfEast = windOrder.indexOf('east');

  // Rotate both arrays to start with the East wind
  const rotatedPlayerWinds = playerWinds
    .slice(indexOfEast)
    .concat(playerWinds.slice(0, indexOfEast));
  const rotatedPlayerPositions = playerPositions
    .slice(indexOfEast)
    .concat(playerPositions.slice(0, indexOfEast));

  // Map player positions to wind directions
  const turnOrder: TurnOrder = {};
  for (let i = 0; i < rotatedPlayerPositions.length; i++) {
    turnOrder[rotatedPlayerWinds[i]] = rotatedPlayerPositions[i];
  }
  console.log(turnOrder);
  return turnOrder;
};

export default determineTurnOrder;
