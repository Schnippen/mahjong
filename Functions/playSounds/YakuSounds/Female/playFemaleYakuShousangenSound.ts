import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuShousangenSound = new Sound('shousangen.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuShousangenSound loaded: duration in seconds: " + FemaleYakuShousangenSound.getDuration() +
    " number of channels: " + FemaleYakuShousangenSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuShousangenSound = (volume: number) => {
  FemaleYakuShousangenSound.setVolume(volume);
  FemaleYakuShousangenSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuShousangenSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};