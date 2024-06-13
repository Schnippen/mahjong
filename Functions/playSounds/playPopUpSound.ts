import popup from '../../Assets/Sounds/popup.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var popupSound = new Sound(popup, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  popupSound.setVolume(soundVolume);
  
  console.log("popupSound"+
    'duration in seconds: ' +
      popupSound.getDuration() +
      ' number of channels: ' +
      popupSound.getNumberOfChannels(),"volume:"+popupSound.getVolume()
  );
});
popupSound.release();


export const playPopUpSound = () => {
  popupSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPausepopupSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};