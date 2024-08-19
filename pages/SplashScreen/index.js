import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { getData } from "../../utils/storage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const tokenData = await getData("token");
        const userData = await getData("user");

        if (!tokenData) {
          navigation.replace("Login");
          return;
        }
        navigation.replace("MainApp");
        console.log("token:", tokenData);
        console.log("user:", userData);
      } catch (error) {
        console.error("Error while checking token:", error);
        navigation.replace("Login");
      }
    };
    checkTokenAndNavigate();
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: "#106EEA",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../../assets/img/Ilustration/ayam_bangkok.png")} />
      <View style={{ height: 38 }} />
      <Text style={{ fontSize: 32, color: "#ffff" }}>Ayam Bangkok</Text>
    </View>
  );
};

export default SplashScreen;
