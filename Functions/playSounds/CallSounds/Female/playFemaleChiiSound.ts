import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleChiiSound = new Sound('chiiakemi.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleChiiSound loaded: duration in seconds: " + FemaleChiiSound.getDuration() +
    " number of channels: " + FemaleChiiSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleChiiSound = (volume: number) => {
  FemaleChiiSound.setVolume(volume);
  FemaleChiiSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleChiiSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};