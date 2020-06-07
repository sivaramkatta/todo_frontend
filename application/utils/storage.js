import AsyncStorage from '@react-native-community/async-storage';

export async function GetFromStorage(key) {
  const value = await AsyncStorage.getItem(key);
  return value;
}

export async function SetInStorage(key, value) {
  await AsyncStorage.setItem(key, value);
}

export async function DeleteStorage() {
  const all_keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(all_keys);
}
