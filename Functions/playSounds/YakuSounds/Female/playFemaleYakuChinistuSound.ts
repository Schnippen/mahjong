import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuChinistuSound = new Sound('chiinitsu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuChinistuSound loaded: duration in seconds: " + FemaleYakuChinistuSound.getDuration() +
    " number of channels: " + FemaleYakuChinistuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuChinistuSound = (volume: number) => {
  FemaleYakuChinistuSound.setVolume(volume);
  FemaleYakuChinistuSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuChinistuSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};