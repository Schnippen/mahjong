import Sound from 'react-native-sound';
import store from '../../../Store/store';
Sound.setCategory('Playback');
const RonTsumoActive = new Sound('rontsumosound.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("RonTsumoActive loaded: duration in seconds: " + RonTsumoActive.getDuration() +
    " number of channels: " + RonTsumoActive.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playRonTsumoActiveSound = () => {
  setTimeout(() => {
    const RonTsumoActive = new Sound('rontsumosound.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log("RonTsumoActive loaded: duration in seconds: " + RonTsumoActive.getDuration() +
        " number of channels: " + RonTsumoActive.getNumberOfChannels());
    });
    
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      RonTsumoActive.setVolume(volume);
      RonTsumoActive.play(success => {
        if (success) {
          console.log('successfully finished playing RonTsumoActive');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 5);
  }, 5);
};
