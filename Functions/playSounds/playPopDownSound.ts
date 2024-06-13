import popdown from '../../Assets/Sounds/popdown.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var popdownSound = new Sound(popdown, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  popdownSound.setVolume(soundVolume);
  
  console.log("popdownSound"+
    'duration in seconds: ' +
      popdownSound.getDuration() +
      ' number of channels: ' +
      popdownSound.getNumberOfChannels(),"volume:"+popdownSound.getVolume()
  );
});
popdownSound.release();


export const playPopDownSound = () => {
  popdownSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPausepopdownSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};