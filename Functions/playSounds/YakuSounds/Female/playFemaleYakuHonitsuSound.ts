import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuHonitsuSound = new Sound('honitsu.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuHonitsuSound loaded: duration in seconds: " + FemaleYakuHonitsuSound.getDuration() +
    " number of channels: " + FemaleYakuHonitsuSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuHonitsuSound = (volume: number) => {
  FemaleYakuHonitsuSound.setVolume(volume);
  FemaleYakuHonitsuSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuHonitsuSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};