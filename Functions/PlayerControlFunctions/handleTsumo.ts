import { TTileObject, TstolenTiles } from "../../Types/types";
import { checkYakusInHand } from "../isWinning/calulateYakus";
import { soundFunc } from "../playSounds/soundFunc";

type handleTsumoTypes = {
    hand: TTileObject[], discard: TTileObject[], currentMelds: TstolenTiles[], dispatch: any
}

export const handleTsumo = ({hand, discard, currentMelds, dispatch}: handleTsumoTypes) => {
    soundFunc({type:"tsumo"})
    checkYakusInHand(hand, discard, currentMelds, dispatch)
};
