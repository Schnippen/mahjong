import { TTileObject, TstolenTiles } from "../../Types/types";
import { checkYakusInHand } from "../isWinning/calulateYakus";
import { soundFunc } from "../playSounds/soundFunc";

type handleRonTypes = {
    hand: TTileObject[], discard: TTileObject[], currentMelds: TstolenTiles[], dispatch: any
}

export const handleRon = ({hand, discard, currentMelds, dispatch}: handleRonTypes) => {
    soundFunc({type:"ron"})
    checkYakusInHand(hand, discard, currentMelds, dispatch)
};
