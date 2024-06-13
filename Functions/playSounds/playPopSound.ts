import pop from '../../Assets/Sounds/pop.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var popSound = new Sound(pop, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  popSound.setVolume(soundVolume);
  
  console.log("popSound"+
    'duration in seconds: ' +
      popSound.getDuration() +
      ' number of channels: ' +
      popSound.getNumberOfChannels(),"volume:"+popSound.getVolume()
  );
});
popSound.release();


export const playPopSound = () => {
  popSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPausepopSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};