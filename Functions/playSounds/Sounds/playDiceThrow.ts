import Sound from 'react-native-sound';
Sound.setCategory('Playback');
Sound.setCategory('Playback');
const touchSound = new Sound('touch.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("touchSound loaded: duration in seconds: " + touchSound.getDuration() +
    " number of channels: " + touchSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playTouchSound = (volume: number) => {
  touchSound.setVolume(volume);
  touchSound.play(success => {
    if (success) {
      console.log('successfully finished playing touchSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};