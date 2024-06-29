import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuIttsuuSound = new Sound('ittsuu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuIttsuuSound loaded: duration in seconds: " + FemaleYakuIttsuuSound.getDuration() +
    " number of channels: " + FemaleYakuIttsuuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuIttsuuSound = (volume: number) => {
  FemaleYakuIttsuuSound.setVolume(volume);
  FemaleYakuIttsuuSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuIttsuuSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};