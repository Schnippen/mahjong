import { discardTileFromHand, setStolenTilesOnBoard } from "../../Store/playersReducer";
import { popFromTheRiver } from "../../Store/riverReducer";
import { TTileObject } from "../../Types/types";
import { positionType, stealTriplet } from "../stealTriplet";

//TODO dispatch typescript
export const handlePon = (
    {handData,
        currentDiscard,
        playerWhoLeftTheTile,dispatch,
        setDisplayChiiButton,
        setDisplayPonButton,
        setDisplayKanButton,
        setChiiPanelDisplayed}:{
            handData: TTileObject[],
            currentDiscard: TTileObject[],
            playerWhoLeftTheTile:string,dispatch:any,
            setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,
            setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,
            setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,
            setChiiPanelDisplayed:React.Dispatch<React.SetStateAction<boolean>>
    }
  ) => {
   const start = performance.now();
   let positionOfPlayerWhoLeftTheTile = (playerWhoLeftTheTile: string): positionType => {
    if (playerWhoLeftTheTile === 'player1') {
      return 'bottom';
    } else if (playerWhoLeftTheTile === 'player2') {
      return 'right';
    } else if (playerWhoLeftTheTile === 'player3') {
      return 'top';
    } else if (playerWhoLeftTheTile === 'player4') {
      return 'left';
    } else {
      return 'bottom';
    }
  };
  const position: positionType = positionOfPlayerWhoLeftTheTile(playerWhoLeftTheTile);
    let {result, ponArray} = stealTriplet(handData,currentDiscard,position);
    console.log(
      'stealTriplet:',
      result,
      ponArray?.map(t => t.name),
      'playerPos:',
      position,
    ); 
    //TODO make it usable for Ai
     ponArray?.forEach(tile => {
      dispatch(discardTileFromHand({player: 'player1', tile: tile}));
    });
    dispatch(
      setStolenTilesOnBoard({
        player: 'player1',
        tilesArray: ponArray,
        name: position,
        isOpen: true,
      }),
    );
    dispatch(popFromTheRiver({player: playerWhoLeftTheTile}));
    setDisplayChiiButton(false);
    setDisplayKanButton(false);
    setDisplayPonButton(false);
    setChiiPanelDisplayed(false);
    //dispatch(SET_LATEST_TURN()); 
    const end = performance.now();
    console.log(`handlePon() took ${end - start} milliseconds.`);
  };