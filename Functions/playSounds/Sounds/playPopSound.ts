import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');
const popSound = new Sound('pop.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("popSound loaded: duration in seconds: " + popSound.getDuration() +
    " number of channels: " + popSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playPopSound = (volume: number) => {
  popSound.setVolume(volume);
  popSound.play(success => {
    if (success) {
      console.log('successfully finished playing popSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};