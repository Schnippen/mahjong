import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuHonrotounSound = new Sound('honrotou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuHonrotounSound loaded: duration in seconds: " + FemaleYakuHonrotounSound.getDuration() +
    " number of channels: " + FemaleYakuHonrotounSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuHonrotounSound = (volume: number) => {
  FemaleYakuHonrotounSound.setVolume(volume);
  FemaleYakuHonrotounSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuHonrotounSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};