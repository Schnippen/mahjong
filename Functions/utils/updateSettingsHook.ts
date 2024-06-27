import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { getSettings } from "../../Store/asyncStorage";
import { setVoiceType, setVolume, toggleNumerals, toggleSounds, toggleVibrations } from "../../Store/settingsReducer";
import { useAppDispatch } from "../../Store/hooks";


const useUpdateSettings = () => {
  const dispatch = useAppDispatch();

  const updateSettings = async () => {
    try {
      const storedSettings = await getSettings();
      console.log('loadSettings: HOOK', storedSettings);

      let voices = storedSettings.voices === 'FEMALE' ? 2 : storedSettings.voices === 'MALE' ? 1 : 0;
      let volume = storedSettings.volume * 10;

      dispatch(toggleNumerals(storedSettings.numerals));
      dispatch(toggleSounds(storedSettings.sound));
      dispatch(toggleVibrations(storedSettings.vibrations));
      dispatch(setVoiceType(voices));
      dispatch(setVolume(volume));
    } catch (e) {
      console.info('useFocusEffect async-storage:', e);
    }
  };

  return updateSettings;
};
  export default useUpdateSettings;