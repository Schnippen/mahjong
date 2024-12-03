import Sound from 'react-native-sound';
import store from '../../../Store/store';

Sound.setCategory('Playback');
const meldActionSound = new Sound('meldactionsound.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
/*   console.log("meldActionSound loaded: duration in seconds: " + meldActionSound.getDuration() +
    " number of channels: " + meldActionSound.getNumberOfChannels()); */
});

// Define the play function inside a component to use hooks
export const playMeldActionSound = () => {
  setTimeout(() => {
    const meldActionSound = new Sound('meldactionsound.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
/*       console.log("meldActionSound loaded: duration in seconds: " + meldActionSound.getDuration() +
        " number of channels: " + meldActionSound.getNumberOfChannels()); */
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      meldActionSound.setVolume(volume);
      meldActionSound.play(success => {
   /*      if (success) {
          console.log('successfully finished playing meldActionSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        } */
      });
    }, 5);
  }, 5);
};
