import { soundFunc } from "../playSounds/soundFunc";

type handleTsumoTypes = {};

export const handleTsumo = ({}: handleTsumoTypes) => {
    soundFunc({type:"tsumo"})
};
