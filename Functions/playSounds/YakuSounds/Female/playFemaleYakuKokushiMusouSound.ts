import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuKokushiMusouSound = new Sound('kokushimusou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuKokushiMusouSound loaded: duration in seconds: " + FemaleYakuKokushiMusouSound.getDuration() +
    " number of channels: " + FemaleYakuKokushiMusouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuKokushiMusouSound = () => {
  setTimeout(() => {
    const FemaleYakuKokushiMusouSound = new Sound('kokushimusou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuKokushiMusouSound loaded: duration in seconds: " + FemaleYakuKokushiMusouSound.getDuration() +
        " number of channels: " + FemaleYakuKokushiMusouSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuKokushiMusouSound.setVolume(volume);
      FemaleYakuKokushiMusouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuKokushiMusouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};

