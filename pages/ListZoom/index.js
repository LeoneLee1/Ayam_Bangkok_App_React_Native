import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getData } from "../../utils";
import { deleteZoom, getBookingZoomAction, updateValueZoomAction } from "../../redux/action";

const ListZoom = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, nama, user, password, kapasitas } = route.params;
  const data = useSelector((state) => state.bookingZoomReducer);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getData("token");
      const userData = await getData("user");
      setClient(userData);
    };
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getBookingZoomAction(id));
    }, [dispatch, id])
  );

  const handleRoomPress = (nama) => {
    navigation.navigate("PesanZoom", { nama });
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Konfirmasi",
      `Apakah Anda yakin ingin membatalkan pesanan zoom ini?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            await dispatch(updateValueZoomAction(item.id));
            dispatch(getBookingZoomAction(id));
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header title={`Zoom ${nama}`} onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>User:</Text>
          <Text style={styles.value}>{user}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>{password}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PesanZoom", { nama })}>
            <Icon name="add-circle" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Pesan Zoom</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Tanggal</Text>
            <Text style={styles.headerCell}>Jam Mulai</Text>
            <Text style={styles.headerCell}>Jam Selesai</Text>
            <Text style={styles.headerCell}>Nama</Text>
            <Text style={styles.headerCell}>Aksi</Text>
          </View>
          <ScrollView>
            {data?.isizoom?.data?.pesanZooms?.length > 0 ? (
              data.isizoom.data.pesanZooms.map((item, index) => {
                if (item.sofdel == 1) {
                  return (
                    <TouchableOpacity key={index.toString()} disabled={true} onPress={() => handleRoomPress(item.nama)}>
                      <View style={styles.row}>
                        <Text style={styles.cell}>{moment(item.tanggal).format("DD MMM YYYY")}</Text>
                        <Text style={styles.cell}>{moment(item.jam_mulai, "HH:mm:ss").format("HH:mm")}</Text>
                        <Text style={styles.cell}>{moment(item.jam_selesai, "HH:mm:ss").format("HH:mm")}</Text>
                        <Text style={styles.cell}>{item.nama}</Text>
                        <Text style={styles.cell}>
                          <View style={styles.actionButtons}>
                            {item.username === client?.value?.username && (
                              <>
                                <TouchableOpacity
                                  style={styles.actionButton}
                                  onPress={() =>
                                    navigation.navigate("EditZoom", {
                                      id: item.id,
                                      zoom: item.zoom,
                                      tanggal: item.tanggal,
                                      jam_mulai: item.jam_mulai,
                                      jam_selesai: item.jam_selesai,
                                    })
                                  }
                                >
                                  <Icon name="pencil-outline" size={18} color="#007bff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item)}>
                                  <Icon name="trash-outline" size={18} color="#dc3545" />
                                </TouchableOpacity>
                              </>
                            )}
                          </View>
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
                return null;
              })
            ) : (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 150 }}>
                <Text style={{ fontSize: 15 }}>Tidak ada pemesanan dalam zoom ini...</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ListZoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005BAC",
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    width: 80,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#495057",
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    paddingHorizontal: 5,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#005BAC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    marginLeft: 10,
  },
  table: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#005BAC",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});
