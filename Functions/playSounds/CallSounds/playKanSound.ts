
import Sound from 'react-native-sound';
import KanF from '../../../Assets/Sounds/CallSounds/kanf.mp3';
Sound.setCategory('Playback');
//global volume, global male female // it will be in async storage
let soundVolume:number = 1
//setVolume(value)
var KanFSound = new Sound(KanF, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  KanFSound.setVolume(soundVolume);
  KanFSound.release();
  console.log("KanFSound"+
    'duration in seconds: ' +
      KanFSound.getDuration() +
      ' number of channels: ' +
      KanFSound.getNumberOfChannels(),"volume:"+KanFSound.getVolume()
  );
});
KanFSound.release();
export const playKanSound = () => {
          KanFSound.play(success => {
        if (success) {
          console.log('successfully finished playing KanFSound');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        
      });
};