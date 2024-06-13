import meldAction from '../../Assets/Sounds/meldactionsound.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var meldActionSound = new Sound(meldAction, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  meldActionSound.setVolume(soundVolume);
  
  console.log("meldActionSound"+
    'duration in seconds: ' +
      meldActionSound.getDuration() +
      ' number of channels: ' +
      meldActionSound.getNumberOfChannels(),"volume:"+meldActionSound.getVolume()
  );
});
meldActionSound.release();
export const playMeldActionSound = () => {
  meldActionSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPauseMeldAction');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};