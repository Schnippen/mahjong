import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleTsumoSound = new Sound('tsumoakemi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleTsumoSound loaded: duration in seconds: " + FemaleTsumoSound.getDuration() +
    " number of channels: " + FemaleTsumoSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleTsumoSound = (volume: number) => {
  FemaleTsumoSound.setVolume(volume);
  FemaleTsumoSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleTsumoSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};