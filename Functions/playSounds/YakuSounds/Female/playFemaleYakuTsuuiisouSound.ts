import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuTsuuiisouSound = new Sound('tsuuiisou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuTsuuiisouSound loaded: duration in seconds: " + FemaleYakuTsuuiisouSound.getDuration() +
    " number of channels: " + FemaleYakuTsuuiisouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuTsuuiisouSound = () => {
  setTimeout(() => {
  
    const FemaleYakuTsuuiisouSound = new Sound('tsuuiisou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuTsuuiisouSound loaded: duration in seconds: " + FemaleYakuTsuuiisouSound.getDuration() +
        " number of channels: " + FemaleYakuTsuuiisouSound.getNumberOfChannels());
    });
    
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuTsuuiisouSound.setVolume(volume);
      FemaleYakuTsuuiisouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuTsuuiisouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};

