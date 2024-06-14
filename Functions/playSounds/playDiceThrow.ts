import touch from '../../Assets/Sounds/touch.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');
//TODO change sound, dices have noise on them
Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var touchSound = new Sound(touch, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  touchSound.setVolume(soundVolume);
  
  console.log("touchSound"+
    'duration in seconds: ' +
      touchSound.getDuration() +
      ' number of channels: ' +
      touchSound.getNumberOfChannels(),"volume:"+touchSound.getVolume()
  );
});
touchSound.release();


export const playTouchSound = () => {
  touchSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPauseTouchSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};