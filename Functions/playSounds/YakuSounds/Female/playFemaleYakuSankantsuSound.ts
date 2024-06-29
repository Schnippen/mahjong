import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuSankantsuSound = new Sound('sankantsu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuSankantsuSound loaded: duration in seconds: " + FemaleYakuSankantsuSound.getDuration() +
    " number of channels: " + FemaleYakuSankantsuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuSankantsuSound = (volume: number) => {
  FemaleYakuSankantsuSound.setVolume(volume);
  FemaleYakuSankantsuSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuSankantsuSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};