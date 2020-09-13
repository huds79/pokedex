import AsyncStorage from '@react-native-community/async-storage';

class AsyncStorageServices {
    static storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (e) {
            return false;
        }
    }
  
    static getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    static removeData = async (key) => {
        try {
            const value = await AsyncStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default AsyncStorageServices;