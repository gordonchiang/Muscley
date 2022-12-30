/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllKeys = async () => {
  try {
    return AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('Error getting all keys from AsyncStorage', e);
    return Promise.resolve(null);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('Error clearing AsyncStorage', e);
  }
};
