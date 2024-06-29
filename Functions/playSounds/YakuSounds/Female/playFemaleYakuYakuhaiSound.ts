import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuYakuhaiSound = new Sound('yakuhai.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuYakuhaiSound loaded: duration in seconds: " + FemaleYakuYakuhaiSound.getDuration() +
    " number of channels: " + FemaleYakuYakuhaiSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuYakuhaiSound = (volume: number) => {
  FemaleYakuYakuhaiSound.setVolume(volume);
  FemaleYakuYakuhaiSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuYakuhaiSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};