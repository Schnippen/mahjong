import Sound from 'react-native-sound';
import store from '../../../Store/store';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');
const tileClickSound = new Sound('tileclick.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
 /*  console.log("tileClickSound loaded: duration in seconds: " + tileClickSound.getDuration() +
    " number of channels: " + tileClickSound.getNumberOfChannels()); */
});

// Define the play function inside a component to use hooks
export const playTileClick = () => {
  setTimeout(() => {
    const tileClickSound = new Sound('tileclick.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
  /*     console.log("tileClickSound loaded: duration in seconds: " + tileClickSound.getDuration() +
        " number of channels: " + tileClickSound.getNumberOfChannels()); */
    });
  
    setTimeout(() => {
      let volume = store.getState().settingsReducer.settings.volume
      tileClickSound.setVolume(volume);
      tileClickSound.play(success => {
 /*        if (success) {
          console.log('successfully finished playing tileClickSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        } */
      });
    }, 5);
  }, 5);
};



//create sound store in redux,
// control volume, turn on turn off sounds



  //https://pixabay.com/users/universfield-28281460/ sounds
  //https://alexb72.medium.com/how-to-add-sound-to-react-native-8ef152ba1a6
  //https://blog.logrocket.com/how-to-play-sounds-in-react-native-using-react-native-sound/
  //alternative https://github.com/react-native-audio-toolkit
  //documents https://github.com/zmxv/react-native-sound/wiki/API#release