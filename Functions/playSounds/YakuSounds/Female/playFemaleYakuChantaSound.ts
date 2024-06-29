import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuChantaSound = new Sound('chanta.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuChantaSound loaded: duration in seconds: " + FemaleYakuChantaSound.getDuration() +
    " number of channels: " + FemaleYakuChantaSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuChantaSound = (volume: number) => {
  FemaleYakuChantaSound.setVolume(volume);
  FemaleYakuChantaSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuChantaSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};