import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuSanankouSound = new Sound('sanankou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuSanankouSound loaded: duration in seconds: " + FemaleYakuSanankouSound.getDuration() +
    " number of channels: " + FemaleYakuSanankouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuSanankouSound = () => {
  setTimeout(() => {
    const FemaleYakuSanankouSound = new Sound('sanankou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuSanankouSound loaded: duration in seconds: " + FemaleYakuSanankouSound.getDuration() +
        " number of channels: " + FemaleYakuSanankouSound.getNumberOfChannels());
    });
    
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuSanankouSound.setVolume(volume);
      FemaleYakuSanankouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuSanankouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};

