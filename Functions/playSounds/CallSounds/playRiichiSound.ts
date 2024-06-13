import RiichiF from '../../../Assets/Sounds/CallSounds/riichif.mp3';
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 1
//setVolume(value)
var RiichiSound = new Sound(RiichiF, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  RiichiSound.setVolume(soundVolume);
  
  console.log("RiichiSound "+
    'duration in seconds: ' +
      RiichiSound.getDuration() +
      ' number of channels: ' +
      RiichiSound.getNumberOfChannels(),"volume:"+RiichiSound.getVolume()
  );
});
RiichiSound.release();

/* useEffect(() => {
  RiichiSound.setVolume(soundVolume);
  return () => {
    RiichiSound.release();
  };
}, []); */
export const playRiichiSound = () => {
    
  RiichiSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPauseRiichiSound');
    } else {
    //playPauseRiichiSound()
      console.log('playback failed due to audio decoding errors');
    }
  });
};



export const doPlaySound = (soundFile: string) =>{ 
    const playSound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error: string) => {
         if(error){ console.log('failed to load the sound', error); return; }
     playSound.play((success: boolean) => {
         if(success) { playSound.reset(); return; 

         }else{ 
            console.log('playback failed due to audio decoding errors'); return; } 
        }); 
    });
 }