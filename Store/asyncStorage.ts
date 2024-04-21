import AsyncStorage from "@react-native-async-storage/async-storage";


const example = ""
const storeData = async (value:any) => {
    try {
      await AsyncStorage.setItem('example', value);
    } catch (error) {
      // saving error
      console.error('Error saving data:', error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  const getDataObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

 //https://react-native-async-storage.github.io/async-storage/docs/api