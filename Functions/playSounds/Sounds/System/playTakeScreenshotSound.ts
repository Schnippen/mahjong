import Sound from 'react-native-sound';
import store from '../../../../Store/store';
Sound.setCategory('Playback');

// Define the play function inside a component to use hooks
export const playScreenshotSound = () => {
  setTimeout(() => {
    const ScreenshotSound = new Sound(
      'shutter.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // if loaded successfully
        console.log(
          'ScreenshotSound loaded: duration in seconds: ' +
            ScreenshotSound.getDuration() +
            ' number of channels: ' +
            ScreenshotSound.getNumberOfChannels(),
        );
      },
    );

    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume;
      ScreenshotSound.setVolume(volume);
      ScreenshotSound.play(success => {
        if (success) {
          console.log('successfully finished playing ScreenshotSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
