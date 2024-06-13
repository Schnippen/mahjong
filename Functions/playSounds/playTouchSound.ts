import dicethrow from '../../Assets/Sounds/dicethrow.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var dicethrowSound = new Sound(dicethrow, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  dicethrowSound.setVolume(soundVolume);
  
  console.log("dicethrowSound"+
    'duration in seconds: ' +
      dicethrowSound.getDuration() +
      ' number of channels: ' +
      dicethrowSound.getNumberOfChannels(),"volume:"+dicethrowSound.getVolume()
  );
});
dicethrowSound.release();


export const playDiceThrowSound = () => {
  dicethrowSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPausedicethrowSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};