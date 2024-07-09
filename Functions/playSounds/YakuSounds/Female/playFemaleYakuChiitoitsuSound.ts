import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuChiitoitsuSound = new Sound('chiitoitsu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuChiitoitsuSound loaded: duration in seconds: " + FemaleYakuChiitoitsuSound.getDuration() +
    " number of channels: " + FemaleYakuChiitoitsuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuChiitoitsuSound = () => {
  setTimeout(() => {
    const FemaleYakuChiitoitsuSound = new Sound('chiitoitsu.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuChiitoitsuSound loaded: duration in seconds: " + FemaleYakuChiitoitsuSound.getDuration() +
        " number of channels: " + FemaleYakuChiitoitsuSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuChiitoitsuSound.setVolume(volume);
      FemaleYakuChiitoitsuSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuChiitoitsuSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
