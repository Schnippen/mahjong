import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const triggerHapticFeedback = (type:string) => {
    const vibrationsEnabled = useSelector((state:RootState) => state.settingsReducer.sortTilesOnHand);
    if (vibrationsEnabled) {
      ReactNativeHapticFeedback.trigger(type, options);
    }
  };
  
  export const handleImpactLight = () => {
    triggerHapticFeedback('impactLight');
  };
  
  export const handleImpactMedium = () => {
    triggerHapticFeedback('impactMedium');
  };
  
  export const handleImpactHeavy = () => {
    console.log('haptic button');
    triggerHapticFeedback('impactHeavy');
  };
  
  export const handleNotificationSuccess = () => {
    console.log('haptic button');
    triggerHapticFeedback('notificationSuccess');
  };

  //TODO add Haptics