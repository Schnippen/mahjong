import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleRonSound = new Sound('ronakemi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleRonSound loaded: duration in seconds: " + FemaleRonSound.getDuration() +
    " number of channels: " + FemaleRonSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleRonSound = () => {
  setTimeout(() => {
    const FemaleRonSound = new Sound('ronakemi.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleRonSound loaded: duration in seconds: " + FemaleRonSound.getDuration() +
        " number of channels: " + FemaleRonSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleRonSound.setVolume(volume);
      FemaleRonSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleRonSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
