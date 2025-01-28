import React from 'react';
import {resetToNextRound} from '../../Functions/resetToNextRound';
import {Text, TouchableOpacity, View} from 'react-native';
import {captureScrenshot} from '../../Functions/utils/captureScreenshot';
import {soundFunc} from '../../Functions/playSounds/soundFunc';

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
      <TouchableOpacity
        style={{
          height: 40,
          width: 75,
          backgroundColor: '#e9ebe8',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 3,
          borderColor: '#56a2c4',
        }}
        activeOpacity={0.9}
        onPress={() => {
          console.log('SCRENSHOT Pressed'), captureScrenshot();
          //TODO check if this is working
          soundFunc({type: 'shutter'});
        }}>
        <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>
          {`[◉°]`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 40,
          width: 150,
          backgroundColor: '#e9ebe8',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 3,
          borderColor: '#56a2c4',
        }}
        activeOpacity={0.9}
        onPress={() => resetToNextRound({dispatch, navigation})}>
        <Text style={{color: 'black', fontFamily: 'TheLastShuriken'}}>OK</Text>
      </TouchableOpacity>
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
