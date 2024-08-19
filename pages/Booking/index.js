import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getRuangAction } from "../../redux/action";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Booking = () => {
  const data = useSelector((state) => state.ruangReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRoomPress = (roomId, nama, lantai) => {
    navigation.navigate("ListBooking", { id: roomId, nama, lantai });
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRuangAction());
    }, [dispatch])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#005BAC" }}>
      <Header title="Pesan Ruangan" />
      <ScrollView contentContainerStyle={styles.container}>
        {data?.rooms?.data?.rooms?.map((item, index) => (
          <View style={styles.card} key={index}>
            <TouchableOpacity onPress={() => handleRoomPress(item.id, item.nama, item.lantai)}>
              <Image style={styles.cardImage} source={item.availability ? require("../../assets/tersedia.png") : require("../../assets/terpakai.png")} />
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
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff", // White background for the content area
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  card: {
    width: 102,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgb(244, 244, 244)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardImage: {
    width: 100,
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
});
