import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Gap, Header } from "../../components";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      console.log("Memulai proses logout...");
      await AsyncStorage.removeItem("token");
      console.log("Token berhasil dihapus. Melakukan reset navigasi...");
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (e) {
      showMessage("Gagal Logout");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Button title="Logout" onPress={handleLogout} color="#005BAC" />
        <Gap height={20} />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005BAC",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    overflow: "hidden",
  },
});
