import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakudTanyaoSound = new Sound('tanyao.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakudTanyaoSound loaded: duration in seconds: " + FemaleYakudTanyaoSound.getDuration() +
    " number of channels: " + FemaleYakudTanyaoSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuTanyaoSound = (volume: number) => {
  FemaleYakudTanyaoSound.setVolume(volume);
  FemaleYakudTanyaoSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakudTanyaoSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};