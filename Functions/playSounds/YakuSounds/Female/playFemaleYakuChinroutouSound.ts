import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuChinroutouSound = new Sound('chinroutou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuChinroutouSound loaded: duration in seconds: " + FemaleYakuChinroutouSound.getDuration() +
    " number of channels: " + FemaleYakuChinroutouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuChinroutouSound = (volume: number) => {
  FemaleYakuChinroutouSound.setVolume(volume);
  FemaleYakuChinroutouSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuChinroutouSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};