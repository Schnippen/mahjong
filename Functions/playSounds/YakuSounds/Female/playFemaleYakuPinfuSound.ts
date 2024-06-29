import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuddPinfuSound = new Sound('pinfu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuddPinfuSound loaded: duration in seconds: " + FemaleYakuddPinfuSound.getDuration() +
    " number of channels: " + FemaleYakuddPinfuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuPinfuSound = (volume: number) => {
  FemaleYakuddPinfuSound.setVolume(volume);
  FemaleYakuddPinfuSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuddPinfuSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};