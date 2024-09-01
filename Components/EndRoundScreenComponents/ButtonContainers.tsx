import React from 'react';
import {resetToNextRound} from '../../Functions/resetToNextRound';
import {View} from 'react-native';
import {Button} from '@rneui/themed';
import {captureScrenshot} from '../../Functions/utils/captureScreenshot';
import {soundType} from '../../Functions/playSounds/soundFunc';
//TODO style the buttons
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
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
      }}>
      <Button
        title="[◉°]"
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 8,
        }}
        type="outline"
        raised
        titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
        containerStyle={{
          width: 50,
          /*         marginHorizontal: 50,
        marginVertical: 10, */
          borderRadius: 8,
        }}
        onPress={() => {
          console.log('SCRENSHOT Pressed'),
            /*    hasAndroidPermission()
        savePicture() */
            captureScrenshot();
          soundType('shutter'); //TODO check if this is working
        }}
      />
      <Button
        title="OK"
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 8,
        }}
        type="outline"
        raised
        titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
        containerStyle={{
          width: 80,
          /*         marginHorizontal: 50,
        marginVertical: 10, */
          borderRadius: 8,
        }}
        onPress={() => resetToNextRound({dispatch, navigation})}
      />
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
