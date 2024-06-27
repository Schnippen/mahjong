import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  export const handleImpactLight = () => {
      ReactNativeHapticFeedback.trigger('impactLight', options);   
    };

export const hanpticImpactMedium = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);   
  };

export  const handleImpactHeavy = () => {
    console.log('haptic button');
    ReactNativeHapticFeedback.trigger('impactHeavy', options);   
  };

  export  const handleNotificationSuccess = () => {
    console.log('haptic button');
    ReactNativeHapticFeedback.trigger('notificationSuccess', options);   
  };