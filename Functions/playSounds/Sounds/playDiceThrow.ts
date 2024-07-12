import Sound from 'react-native-sound';
import store from '../../../Store/store';
Sound.setCategory('Playback');
const dicethrowSound = new Sound('dicethrow.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'dicethrowSound loaded: duration in seconds: ' +
      dicethrowSound.getDuration() +
      ' number of channels: ' +
      dicethrowSound.getNumberOfChannels(),
  );
});

// Experiment with preload
export const playDiceThrowSound = () => {
  setTimeout(() => {
    const dicethrowSound = new Sound(
      'dicethrow.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // if loaded successfully
        console.log(
          'dicethrowSound loaded: duration in seconds: ' +
            dicethrowSound.getDuration() +
            ' number of channels: ' +
            dicethrowSound.getNumberOfChannels(),
        );
      },
    );

    setTimeout(() => {
      let soundVolume = store.getState().settingsReducer.settings.volume;

      dicethrowSound.setVolume(soundVolume);
      dicethrowSound.play(success => {
        if (success) {
          console.log('successfully finished playing dicethrowSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
/* 
setTimeout(() => {
  

  setTimeout(() => {
    let volume = store.getState().settingsReducer.settings.volume

  }, 5);
}, 5); */
