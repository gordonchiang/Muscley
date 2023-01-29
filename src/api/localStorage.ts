/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllKeysFromLocalStorage = async () => {
  try {
    return AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('Error getting all keys from AsyncStorage', e);
    throw e;
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('Error clearing AsyncStorage', e);
    throw e;
  }
};

export const saveToLocalStorage = async (key: string, data: unknown) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(`Error saving to key ${key} data ${JSON.stringify(data)}`, e);
    throw e;
  }
};

export const getFromLocalStorage = async (key: string): Promise<unknown> => {
  try {
    const serializedData = await AsyncStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : Promise.resolve(null);
  } catch (e) {
    console.log(`Error getting data for ${key}`, e);
    throw e;
  }
};
