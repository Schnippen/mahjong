import Sound from 'react-native-sound';
import store from '../../../Store/store';
Sound.setCategory('Playback');
const dicetrowSound = new Sound('dicethrow.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("dicetrowSound loaded: duration in seconds: " + dicetrowSound.getDuration() +
    " number of channels: " + dicetrowSound.getNumberOfChannels());
});

// Experiment with preload
export const playdicetrowSound = () => {
  setTimeout(() => {
    const dicetrowSound = new Sound('dicethrow.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("dicetrowSound loaded: duration in seconds: " + dicetrowSound.getDuration() +
        " number of channels: " + dicetrowSound.getNumberOfChannels());
    });
  
    setTimeout(() => {
      let soundVolume = store.getState().settingsReducer.settings.volume
  
    dicetrowSound.setVolume(soundVolume);
    dicetrowSound.play(success => {
      if (success) {
        console.log('successfully finished playing dicetrowSound');
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