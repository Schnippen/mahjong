
import Sound from 'react-native-sound';
import PonF from '../../../Assets/Sounds/CallSounds/ponf.mp3';
Sound.setCategory('Playback');
//global volume, global male female // it will be in async storage
let soundVolume:number = 1
//setVolume(value)
var PonFSound = new Sound(PonF, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  PonFSound.setVolume(soundVolume);
  PonFSound.release();
  console.log("PonFSound"+
    'duration in seconds: ' +
      PonFSound.getDuration() +
      ' number of channels: ' +
      PonFSound.getNumberOfChannels(),"volume:"+PonFSound.getVolume()
  );
});
PonFSound.release();
export const playPonSound = () => {
          PonFSound.play(success => {
        if (success) {
          console.log('successfully finished playing PonFSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        
      });
};