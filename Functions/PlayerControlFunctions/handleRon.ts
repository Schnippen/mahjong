import { TTileObject, TstolenTiles, WindTypes } from "../../Types/types";
import { checkYakusInHand } from "../isWinning/calulateYakus";
import { soundFunc } from "../playSounds/soundFunc";

type handleRonTypes = {
    hand: TTileObject[], discard: TTileObject[], currentMelds: TstolenTiles[], dispatch: any, winnerWind:WindTypes
}

export const handleRon = ({hand, discard, currentMelds, dispatch,winnerWind}: handleRonTypes) => {
    soundFunc({type:"ron"})
    checkYakusInHand(hand, discard, currentMelds, dispatch, winnerWind)
};
