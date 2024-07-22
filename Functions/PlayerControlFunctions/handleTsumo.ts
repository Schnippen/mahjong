import { TTileObject, TstolenTiles, WindTypes } from "../../Types/types";
import { checkYakusInHand } from "../isWinning/calulateYakus";
import { soundFunc } from "../playSounds/soundFunc";

type handleTsumoTypes = {
    hand: TTileObject[], discard: TTileObject[], currentMelds: TstolenTiles[], dispatch: any,winnerWind:WindTypes
}

export const handleTsumo = ({hand, discard, currentMelds, dispatch,winnerWind}: handleTsumoTypes) => {
    soundFunc({type:"tsumo"})
    checkYakusInHand(hand, discard, currentMelds, dispatch,winnerWind)
};
