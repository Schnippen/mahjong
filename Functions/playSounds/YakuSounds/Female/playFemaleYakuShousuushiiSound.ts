import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuShousuushiiSound = new Sound('shousuushii.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuShousuushiiSound loaded: duration in seconds: " + FemaleYakuShousuushiiSound.getDuration() +
    " number of channels: " + FemaleYakuShousuushiiSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuShousuushiiSound = (volume: number) => {
  FemaleYakuShousuushiiSound.setVolume(volume);
  FemaleYakuShousuushiiSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuShousuushiiSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};