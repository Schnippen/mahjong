import {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useIsFocused, CommonActions} from '@react-navigation/native';
import {soundFunc} from '../playSounds/soundFunc';
import {resetToStartScreen} from '../resetToStartScreen';
import {handleImpactLight, handleImpactMedium} from './hapticFeedback';

const useBackHandler = (navigation: any, dispatch: any) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        Alert.alert('Confirmation', 'Are you sure to reset your Game?', [
          {
            text: 'Cancel',
            onPress: () => {
              null;
              soundFunc({type: 'popUp'});
              handleImpactLight();
            },
          },
          {
            text: 'OK',
            onPress: () => {
              soundFunc({type: 'popDown'});
              handleImpactMedium();
              resetToStartScreen(dispatch);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'StartGameScreen'}],
                }),
              );
            },
          },
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isFocused, navigation, dispatch]);
};

export default useBackHandler;
