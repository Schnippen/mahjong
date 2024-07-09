import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
const FemalePonSound = new Sound('ponakemi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemalePonSound loaded: duration in seconds: " + FemalePonSound.getDuration() +
    " number of channels: " + FemalePonSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemalePonSound = () => {
  setTimeout(() => {
    const FemalePonSound = new Sound('ponakemi.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("FemalePonSound loaded: duration in seconds: " + FemalePonSound.getDuration() +
        " number of channels: " + FemalePonSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      FemalePonSound.setVolume(volume);
      FemalePonSound.play(success => {
        if (success) {
          console.log('successfully finished playing FemalePonSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
