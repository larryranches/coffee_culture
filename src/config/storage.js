import { AsyncStorage } from 'react-native';

export const STORAGE_ACCESS_TOKEN_KEY = '@coffee:accessToken';
export const STORAGE_USER_ID_KEY = '@coffee:userId';

async function setStorage(key, accessToken) {
  try {
    await AsyncStorage.setItem(key, accessToken);
  } catch (error) {
    throw new Error(error);
  }
}

async function getStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
}

async function removeStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error(error);
  }
}

export { setStorage, getStorage, removeStorage };
