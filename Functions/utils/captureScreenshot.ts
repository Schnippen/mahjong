import {Platform} from 'react-native';

import {hasAndroidPermission} from './cameraRollPermission';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {captureScreen} from 'react-native-view-shot';
import {soundFunc} from '../playSounds/soundFunc';

export const captureScrenshot = async () => {
  soundFunc({type: 'shutter'});
  captureScreen({
    format: 'png',
    quality: 0.8,
  }).then(
    async uri => {
      console.log('Image saved to', uri);
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.saveAsset(uri);
      //CameraRoll.saveToCameraRoll(uri)
      //Share.open({ title: 'Image', url: uri });
    },
    error => console.error('Oops, snapshot failed', error),
  );
};
