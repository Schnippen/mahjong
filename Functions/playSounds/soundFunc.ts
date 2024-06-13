import { playChiiSound } from "./CallSounds/playChiiSound"
import { playKanSound } from "./CallSounds/playKanSound"
import { playPonSound } from "./CallSounds/playPonSound"
import { playRiichiSound } from "./CallSounds/playRiichiSound"
import { playRonSound } from "./CallSounds/playRonSound"
import { playTsumoSound } from "./CallSounds/playTsumoSound"
import { playTouchSound } from "./playDiceThrow"
import { playMeldActionSound } from "./playMeldActionSound"
import { playPopDownSound } from "./playPopDownSound"
import { playPopSound } from "./playPopSound"
import { playPopUpSound } from "./playPopUpSound"
import { playRonTsumoSound } from "./playRonTsumoSound"
import { playTileClick } from "./playTileClickSound"
import { playDiceThrowSound } from "./playTouchSound"

type soundFuncTypes={
    type:"chii"|"pon"|"kan"|"riichi"|"ron"|"tsumo"|'meldSound'|'rontsumoSound'|"touchSound"|"tileClickSound"|"pop"|"popDown"|"popUp"|"diceThrow"
    //gender:"male"|"female"
}
//add male add female from async storage, async storage will be set in setting screen
export function soundFunc({type}:soundFuncTypes){
    if(type==="chii"){
        playChiiSound()
    }
    else if (type==="pon"){
        playPonSound()
    }else if (type==="kan"){
        playKanSound()
    }else if (type==="riichi"){
        playRiichiSound()
    }else if (type==="ron"){
        playRonSound()
    }else if (type==="tsumo"){
        playTsumoSound()
    }else if(type==="meldSound"){
        playMeldActionSound()
    }else if(type==="rontsumoSound"){
        playRonTsumoSound()
    }else if(type==='touchSound'){
        playTouchSound()
    }else if(type==='tileClickSound'){
        playTileClick()
    }else if(type==='pop'){
        playPopSound()
    }else if(type==='popUp'){
        playPopUpSound()
    }else if(type==='popDown'){
        playPopDownSound()
    }
    else if(type==='diceThrow'){
        playDiceThrowSound()
    }
}