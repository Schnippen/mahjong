import Sound from 'react-native-sound';
import store from '../../../Store/store';
Sound.setCategory('Playback');
const playTouchSound = new Sound('touch.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("playTouchSound loaded: duration in seconds: " + playTouchSound.getDuration() +
    " number of channels: " + playTouchSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playplayTouchSound = () => {
  setTimeout(() => {
    const playTouchSound = new Sound('touch.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("playTouchSound loaded: duration in seconds: " + playTouchSound.getDuration() +
        " number of channels: " + playTouchSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let soundVolume = store.getState().settingsReducer.settings.volume
  
      playTouchSound.setVolume(soundVolume);
      playTouchSound.play(success => {
        if (success) {
          console.log('successfully finished playing playTouchSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
  }

