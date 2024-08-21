import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Header } from "../../components";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuAll = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin logout?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              console.log("Memulai proses logout...");
              await AsyncStorage.removeItem("token");
              console.log("Token berhasil dihapus. Melakukan reset navigasi...");
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            } catch (e) {
              showMessage("Gagal Logout");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Main Menu" subTitle="Ayam Bangkok" />
      <View style={styles.backgroundContainer}>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <TouchableOpacity style={styles.tableCell} onPress={() => navigation.navigate("Saran")}>
              <Image source={require("../../assets/img/Icon/icon-kritik.png")} style={styles.icon} />
              <Text style={[styles.cellText, { color: "#106eea" }]}>Kritik & Saran</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tableCell} onPress={() => navigation.navigate("Kantor")}>
              <Image source={require("../../assets/img/Icon/icons-gps.png")} style={styles.icon} />
              <Text style={[styles.cellText, { color: "#106eea" }]}>Lokasi Unit Kantor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tableRow}>
            <TouchableOpacity style={styles.tableCell} onPress={() => navigation.navigate("Absen")}>
              <Image source={require("../../assets/img/Icon/icon-absen.png")} style={styles.icon} />
              <Text style={[styles.cellText, { color: "#106eea" }]}>Data Absen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tableCell} onPress={() => navigation.navigate("Kandang")}>
              <Image source={require("../../assets/img/Icon/icons-kandang.png")} style={styles.icon} />
              <Text style={[styles.cellText, { color: "#106eea" }]}>Lokasi Kandang</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tableRow}>
            <TouchableOpacity style={styles.tableCell} onPress={handleLogout}>
              <Image source={require("../../assets/img/Icon/icons8-power-off-100-red.png")} style={styles.icon} />
              <Text style={[styles.cellText, { color: "#106eea" }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005BAC",
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#f2f9ff",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  tableContainer: {
    marginVertical: 20,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tableCell: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#106eea",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    elevation: 2,
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
  cellText: {
    fontSize: 14,
    textAlign: "center",
    color: "#106eea",
  },
});
