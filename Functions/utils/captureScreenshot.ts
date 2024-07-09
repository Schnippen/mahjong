import { Platform } from "react-native";

import { hasAndroidPermission } from "./cameraRollPermission";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { captureScreen } from "react-native-view-shot";
import { playTakeScreenshotSound } from "../playSounds/Sounds/System/playTakeScreenshotSound";

export const captureScrenshot = async ()=>{
    playTakeScreenshotSound()
     captureScreen({
      format: 'png',
      quality: 0.8,
    }).then(
      async (uri) => {
        console.log('Image saved to', uri);
        if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
          return;
        }
        CameraRoll.saveAsset(uri)
        //CameraRoll.saveToCameraRoll(uri)
        //Share.open({ title: 'Image', url: uri });
      },
      (error) => console.error('Oops, snapshot failed', error)
    ) 
  }