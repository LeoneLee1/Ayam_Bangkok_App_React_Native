import React, { useEffect, useState } from "react";
import { View, Text, Button, Modal, StyleSheet, Linking } from "react-native";
import axios from "axios";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import FlashMessage from "react-native-flash-message";
import { Loading } from "./components";
import { appVersion } from "./version";

const MainApp = () => {
  const { isLoading } = useSelector((state) => state.globalReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateLink, setUpdateLink] = useState("");

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await axios.get("https://apps.ptmustika.my.id/api/value");
        const { updateLink, version } = response.data.data;

        if (version === appVersion) {
          setUpdateLink(updateLink);
          setModalVisible(true);
        }
      } catch (error) {
        console.error("Error checking version", error);
      }
    };

    checkVersion();
  }, []);

  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
      <Modal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Silahkan Update Aplikasi Anda,Tekan Tombol Update!</Text>
          <Button
            title="Update"
            onPress={() => {
              Linking.openURL(updateLink);
            }}
          />
        </View>
      </Modal>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
  },
});

export default App;
