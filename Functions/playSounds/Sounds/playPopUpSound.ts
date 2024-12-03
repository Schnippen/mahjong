import Sound from 'react-native-sound';
import store from '../../../Store/store';
Sound.setCategory('Playback');
const popUpSound = new Sound('popup.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
/*   console.log("popUpSound loaded: duration in seconds: " + popUpSound.getDuration() +
    " number of channels: " + popUpSound.getNumberOfChannels()); */
});

// Define the play function inside a component to use hooks
export const playPopUpSound = () => {

  setTimeout(() => {
    const popUpSound = new Sound('popup.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
/*       console.log("popUpSound loaded: duration in seconds: " + popUpSound.getDuration() +
        " number of channels: " + popUpSound.getNumberOfChannels()); */
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      popUpSound.setVolume(volume);
      popUpSound.play(success => {
   /*      if (success) {
          console.log('successfully finished playing tileClickSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        } */
      });
    }, 5);
  }, 5);
};
