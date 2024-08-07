import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuSuuankouSound = new Sound('suuankou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuSuuankouSound loaded: duration in seconds: " + FemaleYakuSuuankouSound.getDuration() +
    " number of channels: " + FemaleYakuSuuankouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuSuuankouSound = () => {
  setTimeout(() => {
    const FemaleYakuSuuankouSound = new Sound('suuankou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuSuuankouSound loaded: duration in seconds: " + FemaleYakuSuuankouSound.getDuration() +
        " number of channels: " + FemaleYakuSuuankouSound.getNumberOfChannels());
    });
    
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuSuuankouSound.setVolume(volume);
      FemaleYakuSuuankouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuSuuankouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
