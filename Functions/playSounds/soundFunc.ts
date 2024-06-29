import store, { RootState } from "../../Store/store"
import { VoicesTypes } from "../../Types/types"
import { playFemaleChiiSound } from "./CallSounds/Female/playFemaleChiiSound"
import { playFemaleKanSound } from "./CallSounds/Female/playFemaleKanSound"
import { playFemalePonSound } from "./CallSounds/Female/playFemalePonSound"
import { playFemaleRiichiSound } from "./CallSounds/Female/playFemaleRiichiSound"
import { playFemaleRonSound } from "./CallSounds/Female/playFemaleRonSound"
import { playFemaleTsumoSound } from "./CallSounds/Female/playFemaleTsumoSound"
import { playTouchSound } from "./Sounds/playDiceThrow"
import { playMeldActionSound } from "./Sounds/playMeldActionSound"
import { playPopDownSound } from "./Sounds/playPopDownSound"
import { playPopSound } from "./Sounds/playPopSound"
import { playPopUpSound } from "./Sounds/playPopUpSound"
import { playRonTsumoActiveSound } from "./Sounds/playRonTsumoSound"
import { playTileClick } from "./Sounds/playTileClickSound"
import { playDiceThrowSound } from "./Sounds/playTouchSound"
import { playFemaleYakuChantaSound } from "./YakuSounds/Female/playFemaleYakuChantaSound"
import { playFemaleYakuChiitoitsuSound } from "./YakuSounds/Female/playFemaleYakuChiitoitsuSound"
import { playFemaleYakuChinistuSound } from "./YakuSounds/Female/playFemaleYakuChinistuSound"
import { playFemaleYakuChinroutouSound } from "./YakuSounds/Female/playFemaleYakuChinroutouSound"
import { playFemaleYakuChuurenPoutouSound } from "./YakuSounds/Female/playFemaleYakuChuurenPoutouSound"
import { playFemaleYakuDaisangenSound } from "./YakuSounds/Female/playFemaleYakuDaisangenSound"
import { playFemaleYakuDaisuushiiSound } from "./YakuSounds/Female/playFemaleYakuDaisuushiiSound"
import { playFemaleYakuHonitsuSound } from "./YakuSounds/Female/playFemaleYakuHonitsuSound"
import { playFemaleYakuIipeikouSound } from "./YakuSounds/Female/playFemaleYakuIipeikouSound"
import { playFemaleYakuIttsuuSound } from "./YakuSounds/Female/playFemaleYakuIttsuuSound"
import { playFemaleYakuJunchanSound } from "./YakuSounds/Female/playFemaleYakuJunchanSound"
import { playFemaleYakuKokushiMusouSound } from "./YakuSounds/Female/playFemaleYakuKokushiMusouSound"
import { playFemaleYakuPinfuSound } from "./YakuSounds/Female/playFemaleYakuPinfuSound"
import { playFemaleYakuRyanpeikouSound } from "./YakuSounds/Female/playFemaleYakuRyanpeikouSound"
import { playFemaleYakuRyuuiisouSound } from "./YakuSounds/Female/playFemaleYakuRyuuiisouSound"
import { playFemaleYakuSanankouSound } from "./YakuSounds/Female/playFemaleYakuSanankouSound"
import { playFemaleYakuSankantsuSound } from "./YakuSounds/Female/playFemaleYakuSankantsuSound"
import { playFemaleYakuSanshokuDoujunSound } from "./YakuSounds/Female/playFemaleYakuSanshokuDoujunSound"
import { playFemaleYakuSanshokuDoukouSound } from "./YakuSounds/Female/playFemaleYakuSanshokuDoukouSound"
import { playFemaleYakuShousangenSound } from "./YakuSounds/Female/playFemaleYakuShousangenSound"
import { playFemaleYakuShousuushiiSound } from "./YakuSounds/Female/playFemaleYakuShousuushiiSound"
import { playFemaleYakuSuuankouSound } from "./YakuSounds/Female/playFemaleYakuSuuankouSound"
import { playFemaleYakuSuukantsuSound } from "./YakuSounds/Female/playFemaleYakuSuukantsuSound"
import { playFemaleYakuTanyaoSound } from "./YakuSounds/Female/playFemaleYakuTanyaoSound"
import { playFemaleYakuToitoiSound } from "./YakuSounds/Female/playFemaleYakuToitoiSound"
import { playFemaleYakuTsuuiisouSound } from "./YakuSounds/Female/playFemaleYakuTsuuiisouSound"
import { playFemaleYakuYakuhaiSound } from "./YakuSounds/Female/playFemaleYakuYakuhaiSound"


type SoundFuncTypes = {
    type: "chii" | "pon" | "kan" | "riichi" | "ron" | "tsumo" | 'meldSound' | 'rontsumoSound' | 'touchSound' | 'tileClickSound' | 'pop' | 'popDown' | 'popUp' | 'diceThrow';
  };
//add male add female from async storage, async storage will be set in setting screen
export function soundFunc({type}:SoundFuncTypes){
    let soundVolume = store.getState().settingsReducer.settings.volume
    let voiceGender = store.getState().settingsReducer.settings.voices

    const soundType=(type:string)=>{
        if(type==="chii"){
            playFemaleChiiSound(soundVolume)
        }
        else if (type==="pon"){
            playFemalePonSound(soundVolume)
        }else if (type==="kan"){
            playFemaleKanSound(soundVolume)
        }else if (type==="riichi"){
            playFemaleRiichiSound(soundVolume)
        }else if (type==="ron"){
            playFemaleRonSound(soundVolume)
        }else if (type==="tsumo"){
            playFemaleTsumoSound(soundVolume)
        }else if(type==="rontsumoSound"){
            playRonTsumoActiveSound(soundVolume)
        }else if(type==='touchSound'){
            playTouchSound(soundVolume)
        }else if(type==='tileClickSound'){
            playTileClick(soundVolume)
        }else if(type==='pop'){
            playPopSound(soundVolume)
        }else if(type==='popUp'){
            playPopUpSound(soundVolume)
        }else if(type==='popDown'){
            playPopDownSound(soundVolume)
        }
        else if(type==='diceThrow'){
            playDiceThrowSound(soundVolume)
        }else if(type==="meldSound"){
            playMeldActionSound(soundVolume)
        }else if(type==="chanta"){
            playFemaleYakuChantaSound(soundVolume)
        }else if (type==="chinistu"){
            playFemaleYakuChinistuSound(soundVolume)
        }else if (type==="chiitoitsu"){
            playFemaleYakuChiitoitsuSound(soundVolume)
        }else if(type==="chinroutou"){
            playFemaleYakuChinroutouSound(soundVolume)
        }else if(type ==="chuurenpoutou"){
            playFemaleYakuChuurenPoutouSound(soundVolume)
        }else if(type==="daisangen"){
            playFemaleYakuDaisangenSound(soundVolume)
        }else if(type==="daisuushii"){
            playFemaleYakuDaisuushiiSound(soundVolume)
        }else if(type ==='honitsu'){
            playFemaleYakuHonitsuSound(soundVolume)
        }else if(type==="honrotou"){
            playFemaleYakuChinroutouSound(soundVolume)
        }else if(type==="iipeikou"){
            playFemaleYakuIipeikouSound(soundVolume)
        }else if(type==="ittsuu"){
            playFemaleYakuIttsuuSound(soundVolume)
        }else if(type==="junchan"){
            playFemaleYakuJunchanSound(soundVolume)
        }else if(type==="kokushimusou"){
            playFemaleYakuKokushiMusouSound(soundVolume)
        }else if(type==="pinfu"){
            playFemaleYakuPinfuSound(soundVolume)
        }else if(type==="ryanpeikou"){
            playFemaleYakuRyanpeikouSound(soundVolume)
        }else if(type==="ryuuiisou"){
            playFemaleYakuRyuuiisouSound(soundVolume)
        }
        else if(type==="sanankou"){
            playFemaleYakuSanankouSound(soundVolume)
        }
        else if(type==="sankantsu"){
            playFemaleYakuSankantsuSound(soundVolume)
        }else if(type==="sanshokudoukou"){
            playFemaleYakuSanshokuDoukouSound(soundVolume)
        }else if(type==="sanshokudoujun"){
            playFemaleYakuSanshokuDoujunSound(soundVolume)
        }else if(type==="shousangen"){
            playFemaleYakuShousangenSound(soundVolume)
        }else if(type==="shousuushii"){
            playFemaleYakuShousuushiiSound(soundVolume)
        }else if(type==="shousuushii"){
            playFemaleYakuShousuushiiSound(soundVolume)
        }else if(type==="suuankou"){
            playFemaleYakuSuuankouSound(soundVolume)
        }else if(type==="suukantsu"){
            playFemaleYakuSuukantsuSound(soundVolume)
        }
        else if(type==="tanyao"){
            playFemaleYakuTanyaoSound(soundVolume)
        }
        else if(type==="toitoi"){
            playFemaleYakuToitoiSound(soundVolume)
        }
        else if(type==="tsuuiisou"){
            playFemaleYakuTsuuiisouSound(soundVolume)
        }
        else if(type==="yakuhai"){
            playFemaleYakuYakuhaiSound(soundVolume)
        }
       }

    const playSound=(type:SoundFuncTypes,voiceGender:VoicesTypes)=>{
        if(voiceGender==="OFF"){
            null
            //no voices
        }else if(voiceGender==="FEMALE"){
            null
            //female voices
            //playFemaleSound ( type )
            soundType(type)
            
        }else if(voiceGender==="MALE"){
            null
            //male voices
            //playMaleSound ( type )
            soundType(type)
        }
    }

    console.log("soundFunc test",soundVolume,voiceGender)

//TODO refactor play sound functions
//TODO add yaku sounds by male and female
    
} //add tileclick to melds
//SYSTEM SOUNDS
/* else if(type==='touchSound'){
            playTouchSound(soundVolume)
        }else if(type==='tileClickSound'){
            playTileClick(soundVolume)
        }else if(type==='pop'){
            playPopSound(soundVolume)
        }else if(type==='popUp'){
            playPopUpSound(soundVolume)
        }else if(type==='popDown'){
            playPopDownSound(soundVolume)
        }
        else if(type==='diceThrow'){
            playDiceThrowSound(soundVolume)
        }else if(type==="meldSound"){
            playMeldActionSound(soundVolume)
        }*/