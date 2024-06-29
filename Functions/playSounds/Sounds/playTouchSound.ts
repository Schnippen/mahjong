import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const diceThrowSound = new Sound('dicethrow.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("diceThrowSound loaded: duration in seconds: " + diceThrowSound.getDuration() +
    " number of channels: " + diceThrowSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playDiceThrowSound = (volume: number) => {
  diceThrowSound.setVolume(volume);
  diceThrowSound.play(success => {
    if (success) {
      console.log('successfully finished playing diceThrowSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};