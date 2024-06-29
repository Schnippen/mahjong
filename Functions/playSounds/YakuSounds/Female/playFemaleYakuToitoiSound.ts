import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuToitoiSound = new Sound('toitoi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuToitoiSound loaded: duration in seconds: " + FemaleYakuToitoiSound.getDuration() +
    " number of channels: " + FemaleYakuToitoiSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuToitoiSound = (volume: number) => {
  FemaleYakuToitoiSound.setVolume(volume);
  FemaleYakuToitoiSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuToitoiSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};