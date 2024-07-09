import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuSuukantsuSound = new Sound('Suukantsu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuSuukantsuSound loaded: duration in seconds: " + FemaleYakuSuukantsuSound.getDuration() +
    " number of channels: " + FemaleYakuSuukantsuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuSuukantsuSound = () => {
  setTimeout(() => {
    const FemaleYakuSuukantsuSound = new Sound('Suukantsu.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuSuukantsuSound loaded: duration in seconds: " + FemaleYakuSuukantsuSound.getDuration() +
        " number of channels: " + FemaleYakuSuukantsuSound.getNumberOfChannels());
    });
    
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuSuukantsuSound.setVolume(volume);
      FemaleYakuSuukantsuSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuSuukantsuSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);

};
