import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuIipeikouSound = new Sound('iipeikou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuIipeikouSound loaded: duration in seconds: " + FemaleYakuIipeikouSound.getDuration() +
    " number of channels: " + FemaleYakuIipeikouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuIipeikouSound = () => {
  setTimeout(() => {
    const FemaleYakuIipeikouSound = new Sound('iipeikou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuIipeikouSound loaded: duration in seconds: " + FemaleYakuIipeikouSound.getDuration() +
        " number of channels: " + FemaleYakuIipeikouSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuIipeikouSound.setVolume(volume);
      FemaleYakuIipeikouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuIipeikouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};

