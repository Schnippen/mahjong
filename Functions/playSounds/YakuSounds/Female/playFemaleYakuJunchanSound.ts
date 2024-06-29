import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuJunchanSound = new Sound('junchan.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuJunchanSound loaded: duration in seconds: " + FemaleYakuJunchanSound.getDuration() +
    " number of channels: " + FemaleYakuJunchanSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuJunchanSound = (volume: number) => {
  FemaleYakuJunchanSound.setVolume(volume);
  FemaleYakuJunchanSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuJunchanSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};