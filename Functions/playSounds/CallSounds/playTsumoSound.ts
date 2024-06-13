
import Sound from 'react-native-sound';
import Tsumo from '../../../Assets/Sounds/CallSounds/tsumof.mp3';
Sound.setCategory('Playback');
//global volume, global male female // it will be in async storage
let soundVolume:number = 1
//setVolume(value)
var TsumoFSound = new Sound(TsumoF, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  TsumoFSound.setVolume(soundVolume);
  TsumoFSound.release();
  console.log("TsumoFSound"+
    'duration in seconds: ' +
      TsumoFSound.getDuration() +
      ' number of channels: ' +
      TsumoFSound.getNumberOfChannels(),"volume:"+TsumoFSound.getVolume()
  );
});
TsumoFSound.release();
export const playTsumoSound = () => {
          TsumoFSound.play(success => {
        if (success) {
          console.log('successfully finished playing TsumoFSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        
      });
};