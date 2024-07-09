import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');
Sound.setCategory('Playback');
const ScreenshotSound = new Sound('shutter.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("ScreenshotSound loaded: duration in seconds: " + ScreenshotSound.getDuration() +
    " number of channels: " + ScreenshotSound.getNumberOfChannels());
});

//Experimental 
export const playTakeScreenshotSound = () => {
let soundVolume = store.getState().settingsReducer.settings.volume
  ScreenshotSound.setVolume(soundVolume);
  ScreenshotSound.play(success => {
    if (success) {
      console.log('successfully finished playing ScreenshotSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};