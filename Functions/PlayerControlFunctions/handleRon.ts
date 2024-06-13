import { soundFunc } from "../playSounds/soundFunc";

type handleRonTypes = {};

export const handleRon = ({}: handleRonTypes) => {
    soundFunc({type:"ron"})
};
