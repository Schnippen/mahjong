import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleRiichiSound = new Sound('riichiakemi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleRiichiSound loaded: duration in seconds: " + FemaleRiichiSound.getDuration() +
    " number of channels: " + FemaleRiichiSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleRiichiSound = () => {
  setTimeout(() => {
    const FemaleRiichiSound = new Sound('riichiakemi.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleRiichiSound loaded: duration in seconds: " + FemaleRiichiSound.getDuration() +
        " number of channels: " + FemaleRiichiSound.getNumberOfChannels());
    });
    
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleRiichiSound.setVolume(volume);
      FemaleRiichiSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleRiichiSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
