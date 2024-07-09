import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemaleYakuRyanpeikouSound = new Sound('ryanpeikou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuRyanpeikouSound loaded: duration in seconds: " + FemaleYakuRyanpeikouSound.getDuration() +
    " number of channels: " + FemaleYakuRyanpeikouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuRyanpeikouSound = () => {
  setTimeout(() => {
    const FemaleYakuRyanpeikouSound = new Sound('ryanpeikou.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemaleYakuRyanpeikouSound loaded: duration in seconds: " + FemaleYakuRyanpeikouSound.getDuration() +
        " number of channels: " + FemaleYakuRyanpeikouSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemaleYakuRyanpeikouSound.setVolume(volume);
      FemaleYakuRyanpeikouSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemaleYakuRyanpeikouSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
