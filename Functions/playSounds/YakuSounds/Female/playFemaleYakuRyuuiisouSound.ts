import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuRyuuiisouSound = new Sound('ryuuiisou.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuRyuuiisouSound loaded: duration in seconds: " + FemaleYakuRyuuiisouSound.getDuration() +
    " number of channels: " + FemaleYakuRyuuiisouSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuRyuuiisouSound = (volume: number) => {
  FemaleYakuRyuuiisouSound.setVolume(volume);
  FemaleYakuRyuuiisouSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuRyuuiisouSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};