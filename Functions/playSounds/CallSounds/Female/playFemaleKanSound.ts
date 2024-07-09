import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleKanSound = new Sound('kanakemi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleKanSound loaded: duration in seconds: " + FemaleKanSound.getDuration() +
    " number of channels: " + FemaleKanSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleKanSound = () => {
  setTimeout(() => {
    const FemaleKanSound = new Sound('kanakemi.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleKanSound loaded: duration in seconds: " + FemaleKanSound.getDuration() +
        " number of channels: " + FemaleKanSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleKanSound.setVolume(volume);
      FemaleKanSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleKanSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};

