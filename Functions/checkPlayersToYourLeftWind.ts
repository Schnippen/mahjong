export const playerToYourLeftWind = (playersWind: string, latestPlayerTurn: string): boolean => {
    let toYourLeft = "shit";
    //console.log("playerToYourLeftWind:","is running",toYourLeft,playersWind,latestPlayerTurn, toYourLeft === latestPlayerTurn)
    if (playersWind === "east") {
        toYourLeft = "north";
    }
    if (playersWind === "south") {
        toYourLeft = "east";
    }
    if (playersWind === "west") {
        toYourLeft = "south";
    }
    if (playersWind === "north") {
        toYourLeft = "west";
    }
    if (playersWind === latestPlayerTurn) {
        return false;
    }
    if (toYourLeft === latestPlayerTurn) {
        return true;
    }
    return false; 
};
