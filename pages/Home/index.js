import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Modal, ActivityIndicator, Alert } from "react-native";
import { Header, TextInput } from "../../components";
import { getData } from "../../utils";
import { showMessage } from "react-native-flash-message";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { scanAbsenAction } from "../../redux/action/auth";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const [user, setUser] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [locationLoading, setLocationLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userData = await getData("user");
      setUser(userData);
    })();
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const { status: cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === "granted");

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === "granted");

      if (locationStatus === "granted") {
        setLocationLoading(true);
        try {
          const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
          setLatitude(location.coords.latitude.toFixed(10));
          setLongitude(location.coords.longitude.toFixed(10));
        } catch (error) {
          Alert.alert("Error", "Failed to get location. Please try again.");
        } finally {
          setLocationLoading(false);
        }
      }
    };

    getPermissions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    if (data === "Mustika") {
      if (latitude === null || longitude === null) {
        Alert.alert("Invalid Data", "Latitude and Longitude must be filled out.");
      } else {
        dispatch(scanAbsenAction({ latitude, longitude }));
        navigation.reset({
          index: 0,
          routes: [{ name: "Order" }],
        });
      }
    } else {
      Alert.alert("Scan Failed", "Invalid barcode. Please try again.");
    }
    setScanned(false);
  };

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasLocationPermission === false) {
    return <Text>No access to location</Text>;
  }

  return (
    <View style={styles.page}>
      <Header title={`Hello, ${user?.value?.nama || ""}`} />
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Time: {time}</Text>
        </View>
        <View style={styles.container}>
          {!locationLoading && (
            <View style={styles.cameraContainer}>
              <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.camera} />
            </View>
          )}
        </View>
      </View>

      <Modal transparent={true} visible={locationLoading} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput style={styles.hiddenInput} value={latitude} onChangeText={(value) => setLatitude(value)} />
            <TextInput style={styles.hiddenInput} value={longitude} onChangeText={(value) => setLongitude(value)} />
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.modalText}>Mohon ditunggu, sedang mengambil lokasi...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#005BAC",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 5,
    paddingBottom: 20,
  },
  infoContainer: {
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoText: {
    fontSize: 20,
    color: "#000000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: width * 0.8,
    height: height * 0.6,
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    marginTop: 15,
    fontSize: 16,
    color: "#005BAC",
  },
  hiddenInput: {
    display: "none",
  },
});

export default Home;
