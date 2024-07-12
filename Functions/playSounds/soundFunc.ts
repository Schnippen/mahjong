import store, {RootState} from '../../Store/store';
import {VoicesTypes} from '../../Types/types';
import {playFemaleChiiSound} from './CallSounds/Female/playFemaleChiiSound';
import {playFemaleKanSound} from './CallSounds/Female/playFemaleKanSound';
import {playFemalePonSound} from './CallSounds/Female/playFemalePonSound';
import {playFemaleRiichiSound} from './CallSounds/Female/playFemaleRiichiSound';
import {playFemaleRonSound} from './CallSounds/Female/playFemaleRonSound';
import {playFemaleTsumoSound} from './CallSounds/Female/playFemaleTsumoSound';
import {playDiceThrowSound} from './Sounds/playDiceThrow';
import {playMeldActionSound} from './Sounds/playMeldActionSound';
import {playPopDownSound} from './Sounds/playPopDownSound';
import {playPopSound} from './Sounds/playPopSound';
import {playPopUpSound} from './Sounds/playPopUpSound';
import {playRonTsumoActiveSound} from './Sounds/playRonTsumoSound';
import {playTileClick} from './Sounds/playTileClickSound';
import {playFemaleYakuChantaSound} from './YakuSounds/Female/playFemaleYakuChantaSound';
import {playFemaleYakuChiitoitsuSound} from './YakuSounds/Female/playFemaleYakuChiitoitsuSound';
import {playFemaleYakuChinistuSound} from './YakuSounds/Female/playFemaleYakuChinistuSound';
import {playFemaleYakuChinroutouSound} from './YakuSounds/Female/playFemaleYakuChinroutouSound';
import {playFemaleYakuChuurenPoutouSound} from './YakuSounds/Female/playFemaleYakuChuurenPoutouSound';
import {playFemaleYakuDaisangenSound} from './YakuSounds/Female/playFemaleYakuDaisangenSound';
import {playFemaleYakuDaisuushiiSound} from './YakuSounds/Female/playFemaleYakuDaisuushiiSound';
import {playFemaleYakuHonitsuSound} from './YakuSounds/Female/playFemaleYakuHonitsuSound';
import {playFemaleYakuIipeikouSound} from './YakuSounds/Female/playFemaleYakuIipeikouSound';
import {playFemaleYakuIttsuuSound} from './YakuSounds/Female/playFemaleYakuIttsuuSound';
import {playFemaleYakuJunchanSound} from './YakuSounds/Female/playFemaleYakuJunchanSound';
import {playFemaleYakuKokushiMusouSound} from './YakuSounds/Female/playFemaleYakuKokushiMusouSound';
import {playFemaleYakuPinfuSound} from './YakuSounds/Female/playFemaleYakuPinfuSound';
import {playFemaleYakuRyanpeikouSound} from './YakuSounds/Female/playFemaleYakuRyanpeikouSound';
import {playFemaleYakuRyuuiisouSound} from './YakuSounds/Female/playFemaleYakuRyuuiisouSound';
import {playFemaleYakuSanankouSound} from './YakuSounds/Female/playFemaleYakuSanankouSound';
import {playFemaleYakuSankantsuSound} from './YakuSounds/Female/playFemaleYakuSankantsuSound';
import {playFemaleYakuSanshokuDoujunSound} from './YakuSounds/Female/playFemaleYakuSanshokuDoujunSound';
import {playFemaleYakuSanshokuDoukouSound} from './YakuSounds/Female/playFemaleYakuSanshokuDoukouSound';
import {playFemaleYakuShousangenSound} from './YakuSounds/Female/playFemaleYakuShousangenSound';
import {playFemaleYakuShousuushiiSound} from './YakuSounds/Female/playFemaleYakuShousuushiiSound';
import {playFemaleYakuSuuankouSound} from './YakuSounds/Female/playFemaleYakuSuuankouSound';
import {playFemaleYakuSuukantsuSound} from './YakuSounds/Female/playFemaleYakuSuukantsuSound';
import {playFemaleYakuTanyaoSound} from './YakuSounds/Female/playFemaleYakuTanyaoSound';
import {playFemaleYakuToitoiSound} from './YakuSounds/Female/playFemaleYakuToitoiSound';
import {playFemaleYakuTsuuiisouSound} from './YakuSounds/Female/playFemaleYakuTsuuiisouSound';
import {playFemaleYakuYakuhaiSound} from './YakuSounds/Female/playFemaleYakuYakuhaiSound';

type SoundFuncTypes = {
  type:
    | 'chii'
    | 'pon'
    | 'kan'
    | 'riichi'
    | 'ron'
    | 'tsumo'
    | 'meldSound'
    | 'rontsumoSound'
    | 'touchSound'
    | 'tileClickSound'
    | 'pop'
    | 'popDown'
    | 'popUp'
    | 'diceThrow';
};
//add male add female from async storage, async storage will be set in setting screen
const soundType = (type: string) => {
  console.log('soundType:', type);
  if (type === 'chii') {
    playFemaleChiiSound();
  } else if (type === 'pon') {
    playFemalePonSound();
  } else if (type === 'kan') {
    playFemaleKanSound();
  } else if (type === 'riichi') {
    playFemaleRiichiSound();
  } else if (type === 'ron') {
    playFemaleRonSound();
  } else if (type === 'tsumo') {
    playFemaleTsumoSound();
  } else if (type === 'rontsumoSound') {
    playRonTsumoActiveSound();
  } else if (type === 'touchSound') {
    playTouchSound();
  } else if (type === 'tileClickSound') {
    playTileClick();
  } else if (type === 'pop') {
    playPopSound();
  } else if (type === 'popUp') {
    playPopUpSound();
  } else if (type === 'popDown') {
    playPopDownSound();
  } else if (type === 'meldSound') {
    playMeldActionSound();
  } else if (type === 'chanta') {
    playFemaleYakuChantaSound();
  } else if (type === 'chinitsu') {
    playFemaleYakuChinistuSound();
  } else if (type === 'chiitoitsu') {
    playFemaleYakuChiitoitsuSound();
  } else if (type === 'chinroutou') {
    playFemaleYakuChinroutouSound();
  } else if (type === 'chuurenpoutou') {
    playFemaleYakuChuurenPoutouSound();
  } else if (type === 'daisangen') {
    playFemaleYakuDaisangenSound();
  } else if (type === 'daisuushii') {
    playFemaleYakuDaisuushiiSound();
  } else if (type === 'honitsu') {
    playFemaleYakuHonitsuSound();
  } else if (type === 'honrotou') {
    playFemaleYakuChinroutouSound();
  } else if (type === 'iipeikou') {
    playFemaleYakuIipeikouSound();
  } else if (type === 'ittsuu') {
    playFemaleYakuIttsuuSound();
  } else if (type === 'junchan') {
    playFemaleYakuJunchanSound();
  } else if (type === 'kokushimusou') {
    playFemaleYakuKokushiMusouSound();
  } else if (type === 'pinfu') {
    playFemaleYakuPinfuSound();
  } else if (type === 'ryanpeikou') {
    playFemaleYakuRyanpeikouSound();
  } else if (type === 'ryuuiisou') {
    playFemaleYakuRyuuiisouSound();
  } else if (type === 'sanankou') {
    playFemaleYakuSanankouSound();
  } else if (type === 'sankantsu') {
    playFemaleYakuSankantsuSound();
  } else if (type === 'sanshokudoukou') {
    playFemaleYakuSanshokuDoukouSound();
  } else if (type === 'sanshokudoujun') {
    playFemaleYakuSanshokuDoujunSound();
  } else if (type === 'shousangen') {
    playFemaleYakuShousangenSound();
  } else if (type === 'shousuushii') {
    playFemaleYakuShousuushiiSound();
  } else if (type === 'shousuushii') {
    playFemaleYakuShousuushiiSound();
  } else if (type === 'suuankou') {
    playFemaleYakuSuuankouSound();
  } else if (type === 'suukantsu') {
    playFemaleYakuSuukantsuSound();
  } else if (type === 'tanyao') {
    playFemaleYakuTanyaoSound();
  } else if (type === 'toitoi') {
    playFemaleYakuToitoiSound();
  } else if (type === 'tsuuiisou') {
    playFemaleYakuTsuuiisouSound();
  } else if (type === 'yakuhai') {
    playFemaleYakuYakuhaiSound();
  } else if (type === 'diceThrow') {
    playDiceThrowSound();
  }
};

const playSound = (
  type: string,
  voiceGender: VoicesTypes,
  soundVolume: number,
) => {
  if (voiceGender === 'OFF') {
    null;
    //no voices
  } else if (voiceGender === 'FEMALE') {
    //female voices
    //playFemaleSound ( type )
    //return soundType(type,soundVolume)
  } else if (voiceGender === 'MALE') {
    null;
    //male voices
    //playMaleSound ( type )
    soundType(type);
  }
};

export function soundFunc({type}: SoundFuncTypes) {
  return;
  let soundVolume = store.getState().settingsReducer.settings.volume;
  let voiceGender = store.getState().settingsReducer.settings.voices;
  console.log('soundFunc test', soundVolume, voiceGender, type);
  soundType(type);
  //playFemaleYakuSanshokuDoukouSound(soundVolume)
  /*      if(type==="chii"){
        playFemaleChiiSound()
    }
    else if (type==="pon"){
        playFemalePonSound()
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
        playTouchSound()
    }else if(type==='tileClickSound'){
        playTileClick(soundVolume)
    }else if(type==='pop'){
        playPopSound(soundVolume)
    }else if(type==='popUp'){
        playPopUpSound(soundVolume)
    }else if(type==='popDown'){
        playPopDownSound()
    }
    else if(type==='diceThrow'){
        playdicetrowSound()
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
    }  */
}

function playTouchSound() {
  throw new Error('Function not implemented.');
}
//add tileclick to melds
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

/*             type SoundFuncTypes = {
                type: "chii" | "pon" | "kan" | "riichi" | "ron" | "tsumo" | "meldSound" | "rontsumoSound" | "touchSound" |
                      "tileClickSound" | "pop" | "popDown" | "popUp" | "diceThrow" |
                      "chanta" | "chinistu" | "chiitoitsu" | "chinroutou" | "chuurenpoutou" | "daisangen" |
                      "daisuushii" | "honitsu" | "honrotou" | "iipeikou" | "ittsuu" | "junchan" | "kokushimusou" |
                      "pinfu" | "ryanpeikou" | "ryuuiisou" | "sanankou" | "sankantsu" | "sanshokudoukou" |
                      "sanshokudoujun" | "shousangen" | "shousuushii" | "suuankou" | "suukantsu" | "tanyao" |
                      "toitoi" | "tsuuiisou" | "yakuhai";
              };
              
              export function soundFunc({ type }: SoundFuncTypes) {
                const state = store.getState();
                const soundVolume = state.settingsReducer.settings.volume;
                const voiceGender = state.settingsReducer.settings.voices;
              
                const playFemaleSound = (type: SoundFuncTypes) => {
                  const soundMap: { [key in SoundFuncTypes]: (volume: number) => void } = {
                    chii: playFemaleChiiSound,
                    pon: playFemalePonSound,
                    kan: playFemaleKanSound,
                    riichi: playFemaleRiichiSound,
                    ron: playFemaleRonSound,
                    tsumo: playFemaleTsumoSound,
                    meldSound: playMeldActionSound,
                    rontsumoSound: playRonTsumoActiveSound,
                    touchSound: playTouchSound,
                    tileClickSound: playTileClick,
                    pop: playPopSound,
                    popUp: playPopUpSound,
                    popDown: playPopDownSound,
                    diceThrow: playDiceThrowSound,
                    chanta: playFemaleYakuChantaSound,
                    chinistu: playFemaleYakuChinistuSound,
                    chiitoitsu: playFemaleYakuChiitoitsuSound,
                    chinroutou: playFemaleYakuChinroutouSound,
                    chuurenpoutou: playFemaleYakuChuurenPoutouSound,
                    daisangen: playFemaleYakuDaisangenSound,
                    daisuushii: playFemaleYakuDaisuushiiSound,
                    honitsu: playFemaleYakuHonitsuSound,
                    honrotou: playFemaleYakuChinroutouSound,
                    iipeikou: playFemaleYakuIipeikouSound,
                    itsuu: playFemaleYakuIttsuuSound,
                    junchan: playFemaleYakuJunchanSound,
                    kokushimusou: playFemaleYakuKokushiMusouSound,
                    pinfu: playFemaleYakuPinfuSound,
                    ryanpeikou: playFemaleYakuRyanpeikouSound,
                    ryuuiisou: playFemaleYakuRyuuiisouSound,
                    sanankou: playFemaleYakuSanankouSound,
                    sankantsu: playFemaleYakuSankantsuSound,
                    sanshokudoukou: playFemaleYakuSanshokuDoukouSound,
                    sanshokudoujun: playFemaleYakuSanshokuDoujunSound,
                    shousangen: playFemaleYakuShousangenSound,
                    shousuushii: playFemaleYakuShousuushiiSound,
                    suuankou: playFemaleYakuSuuankouSound,
                    suukantsu: playFemaleYakuSuukantsuSound,
                    tanyao: playFemaleYakuTanyaoSound,
                    toitoi: playFemaleYakuToitoiSound,
                    tsuuiisou: playFemaleYakuTsuuiisouSound,
                    yakuhai: playFemaleYakuYakuhaiSound,
                  };
                  soundMap[type](soundVolume);
                };
              
                const playMaleSound = (type: SoundFuncTypes) => {
                  const soundMap: { [key in SoundFuncTypes]: (volume: number) => void } = {
                    // Define corresponding male sounds similar to female sounds
                    chii: playMaleChiiSound,
                    pon: playMalePonSound,
                    kan: playMaleKanSound,
                    riichi: playMaleRiichiSound,
                    ron: playMaleRonSound,
                    tsumo: playMaleTsumoSound,
                    meldSound: playMeldActionSound,
                    rontsumoSound: playRonTsumoActiveSound,
                    touchSound: playTouchSound,
                    tileClickSound: playTileClick,
                    pop: playPopSound,
                    popUp: playPopUpSound,
                    popDown: playPopDownSound,
                    diceThrow: playDiceThrowSound,
                    chanta: playMaleYakuChantaSound,
                    chinistu: playMaleYakuChinistuSound,
                    chiitoitsu: playMaleYakuChiitoitsuSound,
                    chinroutou: playMaleYakuChinroutouSound,
                    chuurenpoutou: playMaleYakuChuurenPoutouSound,
                    daisangen: playMaleYakuDaisangenSound,
                    daisuushii: playMaleYakuDaisuushiiSound,
                    honitsu: playMaleYakuHonitsuSound,
                    honrotou: playMaleYakuChinroutouSound,
                    iipeikou: playMaleYakuIipeikouSound,
                    itsuu: playMaleYakuIttsuuSound,
                    junchan: playMaleYakuJunchanSound,
                    kokushimusou: playMaleYakuKokushiMusouSound,
                    pinfu: playMaleYakuPinfuSound,
                    ryanpeikou: playMaleYakuRyanpeikouSound,
                    ryuuiisou: playMaleYakuRyuuiisouSound,
                    sanankou: playMaleYakuSanankouSound,
                    sankantsu: playMaleYakuSankantsuSound,
                    sanshokudoukou: playMaleYakuSanshokuDoukouSound,
                    sanshokudoujun: playMaleYakuSanshokuDoujunSound,
                    shousangen: playMaleYakuShousangenSound,
                    shousuushii: playMaleYakuShousuushiiSound,
                    suuankou: playMaleYakuSuuankouSound,
                    suukantsu: playMaleYakuSuukantsuSound,
                    tanyao: playMaleYakuTanyaoSound,
                    toitoi: playMaleYakuToitoiSound,
                    tsuuiisou: playMaleYakuTsuuiisouSound,
                    yakuhai: playMaleYakuYakuhaiSound,
                  };
                  soundMap[type](soundVolume);
                };
              
                if (voiceGender === "OFF") {
                  return;
                } else if (voiceGender === "FEMALE") {
                  playFemaleSound(type);
                } else if (voiceGender === "MALE") {
                  playMaleSound(type);
                }
              } */
