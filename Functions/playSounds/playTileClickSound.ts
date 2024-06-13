import tileclick from '../../Assets/Sounds/tileclick.mp3'
import Sound from 'react-native-sound';

//var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let soundVolume:number = 0.5
//setVolume(value)
var tileClickSound = new Sound(tileclick, error => {
  if (error) { 
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  tileClickSound.setVolume(soundVolume);
  
  console.log("tileClickSound"+
    'duration in seconds: ' +
      tileClickSound.getDuration() +
      ' number of channels: ' +
      tileClickSound.getNumberOfChannels(),"volume:"+tileClickSound.getVolume()
  );
});
tileClickSound.release();

/* useEffect(() => {
  tileClickSound.setVolume(soundVolume);
  return () => {
    tileClickSound.release();
  };
}, []); */
export const playTileClick = () => {
  tileClickSound.play(success => {
    if (success) {
      console.log('successfully finished playing playPauseTileClick');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};


//create sound store in redux,
// control volume, turn on turn off sounds



  //https://pixabay.com/users/universfield-28281460/ sounds
  //https://alexb72.medium.com/how-to-add-sound-to-react-native-8ef152ba1a6
  //https://blog.logrocket.com/how-to-play-sounds-in-react-native-using-react-native-sound/
  //alternative https://github.com/react-native-audio-toolkit
  //documents https://github.com/zmxv/react-native-sound/wiki/API#release