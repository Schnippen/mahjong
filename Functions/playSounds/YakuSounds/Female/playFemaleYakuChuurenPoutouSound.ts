import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuChuurenPoutouSound = new Sound('ChuurenPoutou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuChuurenPoutouSound loaded: duration in seconds: " + FemaleYakuChuurenPoutouSound.getDuration() +
    " number of channels: " + FemaleYakuChuurenPoutouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuChuurenPoutouSound = (volume: number) => {
  FemaleYakuChuurenPoutouSound.setVolume(volume);
  FemaleYakuChuurenPoutouSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuChuurenPoutouSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};