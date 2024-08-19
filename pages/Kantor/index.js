import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../../components";
import { useNavigation } from "@react-navigation/native";

const Kantor = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Lokasi Kantor Unit" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text>On Progress! Please Wait For Update! Thank You</Text>
      </View>
    </View>
  );
};

export default Kantor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005BAC",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff", // White background for the content area
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
});
