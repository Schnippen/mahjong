import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const FemaleYakuSanshokuDoujunSound = new Sound('sanshokudoujun.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log("FemaleYakuSanshokuDoujunSound loaded: duration in seconds: " + FemaleYakuSanshokuDoujunSound.getDuration() +
    " number of channels: " + FemaleYakuSanshokuDoujunSound.getNumberOfChannels());
});

// Define the play function inside a component to use hooks
export const playFemaleYakuSanshokuDoujunSound = (volume: number) => {
  FemaleYakuSanshokuDoujunSound.setVolume(volume);
  FemaleYakuSanshokuDoujunSound.play(success => {
    if (success) {
      console.log('successfully finished playing FemaleYakuSanshokuDoujunSound');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};