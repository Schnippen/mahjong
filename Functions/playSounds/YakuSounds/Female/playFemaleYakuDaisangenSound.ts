import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuDaisangenSound = new Sound('daisangen.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuDaisangenSound loaded: duration in seconds: " + FemaleYakuDaisangenSound.getDuration() +
    " number of channels: " + FemaleYakuDaisangenSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuDaisangenSound = () => {
  setTimeout(() => {
  
    const FemaleYakuDaisangenSound = new Sound('daisangen.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuDaisangenSound loaded: duration in seconds: " + FemaleYakuDaisangenSound.getDuration() +
        " number of channels: " + FemaleYakuDaisangenSound.getNumberOfChannels());
    });
    
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuDaisangenSound.setVolume(volume);
      FemaleYakuDaisangenSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuDaisangenSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
