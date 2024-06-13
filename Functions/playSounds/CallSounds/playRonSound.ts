
import Sound from 'react-native-sound';
import RonF from '../../../Assets/Sounds/CallSounds/ronf.mp3';
Sound.setCategory('Playback');
//global volume, global male female // it will be in async storage
let soundVolume:number = 1
//setVolume(value)
var RonFSound = new Sound(RonF, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  RonFSound.setVolume(soundVolume);
  RonFSound.release();
  console.log("RonFSound"+
    'duration in seconds: ' +
      RonFSound.getDuration() +
      ' number of channels: ' +
      RonFSound.getNumberOfChannels(),"volume:"+RonFSound.getVolume()
  );
});
RonFSound.release();
export const playRonSound = () => {
          RonFSound.play(success => {
        if (success) {
          console.log('successfully finished playing RonFSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        
      });
};