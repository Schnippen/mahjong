
import Sound from 'react-native-sound';
import ChiiF from '../../../Assets/Sounds/CallSounds/chiif.mp3';
Sound.setCategory('Playback');
//global volume, global male female // it will be in async storage
let soundVolume:number = 1
//setVolume(value)
var ChiiFSound = new Sound(ChiiF, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  ChiiFSound.setVolume(soundVolume);
  ChiiFSound.release();
  console.log("ChiiFSound"+
    'duration in seconds: ' +
      ChiiFSound.getDuration() +
      ' number of channels: ' +
      ChiiFSound.getNumberOfChannels(),"volume:"+ChiiFSound.getVolume()
  );
});
ChiiFSound.release();
export const playChiiSound = () => {
          ChiiFSound.play(success => {
        if (success) {
          console.log('successfully finished playing ChiiFSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        
      });
};