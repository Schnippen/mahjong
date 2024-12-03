import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../Store/store';

const options = {
    enableVibrateFallback: false,
    ignoreAndroidSystemSettings: false,
  };
  //this aproach does not work ;c 
 /*  const triggerHapticFeedback = (type:string) => {
    const vibrationsEnabled = useSelector((state:RootState) => state.settingsReducer.settings.vibrations);
    console.log("vibrations enabled?:",vibrationsEnabled)
    if (vibrationsEnabled) {
      ReactNativeHapticFeedback.trigger(type, options);
    }
  }; */
  //const vibrationsEnabled = useSelector((state:RootState) => state.settingsReducer.settings.vibrations);
  const state = store.getState(); // Access the Redux state
  const vibrationsEnabled = state.settingsReducer.settings.vibrations;
  export const handleImpactLight = () => {
    //console.log('haptic button');
    if(vibrationsEnabled){
      ReactNativeHapticFeedback.trigger("impactLight", options);
      }else null
  };
  
  export const handleImpactMedium = () => {
    //console.log('haptic button');
    if(vibrationsEnabled){
ReactNativeHapticFeedback.trigger("impactMedium", options);
}else null
  };
  
  export const handleImpactHeavy = () => {
    //console.log('haptic button');
    if(vibrationsEnabled){
      ReactNativeHapticFeedback.trigger("impactHeavy", options);
      }else null
  };
  
  export const handleNotificationSuccess = () => {
    //console.log('haptic button');
    if(vibrationsEnabled){
      ReactNativeHapticFeedback.trigger("notificationSuccess", options);
      }else null
  };

  //TODO add Haptics