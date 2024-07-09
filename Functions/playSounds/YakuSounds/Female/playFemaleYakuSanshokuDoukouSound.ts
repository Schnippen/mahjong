import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuSanshokuDoukouSound = new Sound('sanshokudoukou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuSanshokuDoukouSound loaded: duration in seconds: " + FemaleYakuSanshokuDoukouSound.getDuration() +
    " number of channels: " + FemaleYakuSanshokuDoukouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuSanshokuDoukouSound = () => {
  setTimeout(() => {
  
    const FemaleYakuSanshokuDoukouSound = new Sound('sanshokudoukou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuSanshokuDoukouSound loaded: duration in seconds: " + FemaleYakuSanshokuDoukouSound.getDuration() +
        " number of channels: " + FemaleYakuSanshokuDoukouSound.getNumberOfChannels());
    });
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuSanshokuDoukouSound.setVolume(volume);
      FemaleYakuSanshokuDoukouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuSanshokuDoukouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
