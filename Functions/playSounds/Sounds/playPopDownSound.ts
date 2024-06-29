import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const popDownSound = new Sound('popdown.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("popDownSound loaded: duration in seconds: " + popDownSound.getDuration() +
    " number of channels: " + popDownSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playPopDownSound = (volume: number) => {
  popDownSound.setVolume(volume);
  popDownSound.play(success => {
    if (success) {
      console.log('successfully finished playing popDownSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};