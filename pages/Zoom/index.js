import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getZoomAction } from "../../redux/action";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Zoom = () => {
  const data = useSelector((state) => state.zoomReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleZoomPress = (zoomId, nama, user, password, kapasitas) => {
    navigation.navigate("ListZoom", { id: zoomId, nama, user, password, kapasitas });
  };

  const handlePesanHarianPress = () => {
    navigation.navigate("ListHarian");
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getZoomAction());
    }, [dispatch])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#005BAC" }}>
      <Header title="Pesan Zoom" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePesanHarianPress}>
          <Icon name="book" size={20} color="#ffffff" />
          <Text style={styles.buttonText}> Pesan Harian</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {data?.zooms?.zooms?.data?.zooms?.map((item, index) => (
          <View style={styles.card} key={index}>
            <TouchableOpacity onPress={() => handleZoomPress(item.id, item.nama, item.user, item.password, item.kapasitas)}>
              <Image style={styles.cardImage} source={require("../../assets/zoom.png")} />
              <View
                style={[
                  styles.cardTextContainer,
                  {
                    backgroundColor: item.availability ? "rgb(0, 163, 0)" : "rgb(163, 0, 0)",
                  },
                ]}
              >
                <Text style={styles.cardText}>{item.nama}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Apa itu Pesan Harian?</Text>
        <Text style={styles.infoText}>
          Pesan Harian adalah fitur yang memungkinkan pengguna untuk memesan Zoom secara otomatis tanpa perlu menginput setiap hari secara manual. Dengan menggunakan fitur ini, pengguna dapat melakukan pemesanan Zoom secara berulang untuk
          periode waktu tertentu.
        </Text>
      </View>
    </View>
  );
};

export default Zoom;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    paddingBottom: 20,
  },
  card: {
    width: 115,
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: 115,
    height: 100,
  },
  cardTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  cardText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#005BAC",
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 300,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005BAC",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 10,
    textAlign: "justify",
  },
});
