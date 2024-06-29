import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuDaisuushiiSound = new Sound('daisuushii.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuDaisuushiiSound loaded: duration in seconds: " + FemaleYakuDaisuushiiSound.getDuration() +
    " number of channels: " + FemaleYakuDaisuushiiSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuDaisuushiiSound = (volume: number) => {
  FemaleYakuDaisuushiiSound.setVolume(volume);
  FemaleYakuDaisuushiiSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuDaisuushiiSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};