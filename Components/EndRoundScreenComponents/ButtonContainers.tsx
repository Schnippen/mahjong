import React from 'react';
import {resetToNextRound} from '../../Functions/resetToNextRound';
import {Text, TouchableOpacity, View} from 'react-native';
import {ButtonCaptureScreenshot} from '../Buttons/ButtonCaptureScreenshot';
import {ButtonResetToNextRound} from '../Buttons/ButtonResetToNextRound';

const ButtonContainers = ({
  dispatch,
  navigation,
}: {
  dispatch: any;
  navigation: any;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
      }}>
      <ButtonCaptureScreenshot />
      <ButtonResetToNextRound />
    </View>
  );
};
export default ButtonContainers;

//TODO https://github.com/gre/react-native-view-shot

/* const captureViewShot =async ()=> {
const imageURI = await viewShotRef.current.capture()
Share.share({title:"Image",url:imageURI})
} */
/* savePicture() */

/* 
  const captureViewShot = async () => {
    const uri = await viewShotRef.current.capture();
    console.log('Captured image URI:', uri);
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(uri, { type: 'photo', album: 'YourAlbumName' });
    Share.open({ title: 'Image', url: uri });
  }; */

// wait for all animations to finish
//https://github.com/gre/react-native-view-shot?tab=readme-ov-file#capturescreen-android-and-ios-only
//TODO add sound of snapshot
