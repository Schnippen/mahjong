import RonTsumo from '../../Assets/Sounds/rontsumosound.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var RonTsumoSound = new Sound(RonTsumo, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  RonTsumoSound.setVolume(soundVolume);
  
  console.log("RonTsumoSound"+
    'duration in seconds: ' +
      RonTsumoSound.getDuration() +
      ' number of channels: ' +
      RonTsumoSound.getNumberOfChannels(),"volume:"+RonTsumoSound.getVolume()
  );
});
RonTsumoSound.release();
export const playRonTsumoSound = () => {
  RonTsumoSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPauseMeldAction');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};