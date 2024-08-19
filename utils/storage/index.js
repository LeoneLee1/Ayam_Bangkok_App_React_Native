import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); // Store value as a JSON string
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse JSON string back to object
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};
