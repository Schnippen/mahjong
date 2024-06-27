import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingStoreTypes{
  sound:boolean,
  volume:number,
  voices:'NONE'| 'MALE'| 'FEMALE',
  vibrations:boolean,
  numerals:boolean,
}


const defaultSettings: SettingStoreTypes = {
  sound: true,
  volume: 1,
  voices: 'FEMALE',
  vibrations: true,
  numerals: false,
};


const SETTINGS_KEY = 'appSettings';

export const getSettings = async (): Promise<SettingStoreTypes> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultSettings;
  } catch (e) {
    console.error('Failed to load settings', e);
    return defaultSettings;
  }
};

export const saveSettings = async (settings: SettingStoreTypes): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

export const resetSettings = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  } catch (e) {
    console.error('Failed to reset settings', e);
  }
};

export const updateSetting = async <K extends keyof SettingStoreTypes>(
  key: K,
  value: SettingStoreTypes[K]
): Promise<void> => {
  try {
    const currentSettings = await getSettings();
    const updatedSettings = { ...currentSettings, [key]: value };
    await saveSettings(updatedSettings);
  } catch (e) {
    console.error('Failed to update setting', e);
  }
};
 //https://react-native-async-storage.github.io/async-storage/docs/api