import Sound from 'react-native-sound';
import store from '../../Store/store';

interface SoundParams {
  type: SoundType;
}

// Define all possible sound types
export type SoundType =
  // Call Sounds
  | 'chii'
  | 'pon'
  | 'kan'
  | 'riichi'
  | 'ron'
  | 'tsumo'
  // General Sounds
  | 'rontsumoSound'
  | 'touchSound'
  | 'tileClickSound'
  | 'pop'
  | 'popUp'
  | 'popDown'
  | 'meldSound'
  | 'diceThrow'
  | 'shutter'
  // Yaku Sounds
  | 'chanta'
  | 'chinitsu'
  | 'chiitoitsu'
  | 'chinroutou'
  | 'chuurenpoutou'
  | 'daisangen'
  | 'daisuushii'
  | 'honitsu'
  | 'honrotou'
  | 'iipeikou'
  | 'ittsuu'
  | 'junchan'
  | 'kokushimusou'
  | 'pinfu'
  | 'ryanpeikou'
  | 'ryuuiisou'
  | 'sanankou'
  | 'sankantsu'
  | 'sanshokudoukou'
  | 'sanshokudoujun'
  | 'shousangen'
  | 'shousuushii'
  | 'suuankou'
  | 'suukantsu'
  | 'tanyao'
  | 'toitoi'
  | 'tsuuiisou'
  | 'yakuhai'
  | 'noten';

//Experiment
const soundFiles = {
  //Call Sounds
  chii: 'chiiakemi.mp3',
  kan: 'kanakemi.mp3',
  pon: 'ponakemi.mp3',
  riichi: 'riichiakemi.mp3',
  ron: 'ronakemi.mp3',
  tsumo: 'tsumoakemi.mp3',

  //General Sounds
  rontsumoSound: 'rontsumosound.mp3',
  meldSound: 'meldactionsound.mp3',
  popDown: 'popdown.mp3',
  pop: 'pop.mp3',
  popUp: 'popup.mp3',
  tileClickSound: 'tileclick.mp3',
  diceThrow: 'dicethrow.mp3',
  shutter: 'screenshot.mp3',

  //Yaku Sounds
  chanta: 'chanta.mp3',
  chiitoitsu: 'chiitoitsu.mp3',
  chinitsu: 'chinitsu.mp3',
  chinroutou: 'chinroutou.mp3',
  chuurenpoutou: 'chuurenpoutou.mp3',
  daisangen: 'daisangen.mp3',
  daisuushii: 'daisuushii.mp3',
  honitsu: 'honitsu.mp3',
  iipeikou: 'iipeikou.mp3',
  ittsuu: 'ittsuu.mp3',
  junchan: 'junchan.mp3',
  kokushimusou: 'kokushimusou.mp3',
  pinfu: 'pinfu.mp3',
  ryanpeikou: 'ryanpeikou.mp3',
  ryuuiisou: 'ryuuiisou.mp3',
  sanankou: 'sanankou.mp3',
  sankantsu: 'sankantsu.mp3',
  sanshokudoukou: 'sanshokudoukou.mp3',
  sanshokudoujun: 'sanshokudoujun.mp3',
  shousangen: 'shousangen.mp3',
  shousuushii: 'shousuushii.mp3',
  suuankou: 'suuankou.mp3',
  suukantsu: 'suukantsu.mp3',
  tanyao: 'tanyao.mp3',
  toitoi: 'toitoi.mp3',
  tsuuiisou: 'tsuuiisou.mp3',
  yakuhai: 'yakuhai.mp3',
  noten: 'notenakemi.mp3',
};

//this works, but change wave to mp3
export const SoundManager = {
  soundPlayers: {} as Record<SoundType, () => void>,

  initialize() {
    Object.entries(soundFiles).forEach(([key, filename]) => {
      this.soundPlayers[key as SoundType] = () => {
        const volume = store.getState().settingsReducer.settings.volume;
        const isSoundOn = store.getState().settingsReducer.settings.sound;

        if (!isSoundOn) return;

        const sound = new Sound(filename, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log(`Failed to load sound ${filename}:`, error);
            return;
          }
          sound.setVolume(volume);
          sound.play();
        });
      };
    });
  },

  playSound(params: SoundParams) {
    this.soundPlayers[params.type]?.();
  },
};

export const soundFunc = (params: SoundParams) => {
  SoundManager.playSound(params);
};
