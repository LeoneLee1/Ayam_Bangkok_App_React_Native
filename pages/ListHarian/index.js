import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils";
import { deletePesanHarian, pesanHarianAction } from "../../redux/action";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";

const ListHarian = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [client, setClient] = useState(null);
  const data = useSelector((state) => state.pesanHarianReducer);

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
      dispatch(pesanHarianAction());
    }, [dispatch])
  );

  const handleDelete = (item) => {
    Alert.alert(
      "Konfirmasi",
      `Apakah Anda yakin ingin menghapus pesan harian ini?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            await dispatch(deletePesanHarian(item.id));
            dispatch(pesanHarianAction());
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header title="List Harian Zoom" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PesanHarian")}>
            <Icon name="add-circle" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Pesan Harian Zoom</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>No</Text>
            <Text style={styles.headerCell}>Nama</Text>
            <Text style={styles.headerCell}>Hari</Text>
            <Text style={styles.headerCell}>Jam Mulai</Text>
            <Text style={styles.headerCell}>Jam Selesai</Text>
            <Text style={styles.headerCell}>Zoom</Text>
            <Text style={styles.headerCell}>Aksi</Text>
          </View>
          <ScrollView>
            {data?.pesanHarian?.pesanHarian?.data?.pesanHarian?.length > 0 ? (
              data.pesanHarian.pesanHarian.data.pesanHarian.map((item, index) => (
                <TouchableOpacity key={index.toString()} disabled={true}>
                  <View style={styles.row}>
                    <Text style={styles.cell}>{index + 1}</Text>
                    <Text style={styles.cell}>{item.nama}</Text>
                    <Text style={styles.cell}>{item.hari}</Text>
                    <Text style={styles.cell}>{moment(item.jam_mulai, "HH:mm:ss").format("HH:mm")}</Text>
                    <Text style={styles.cell}>{moment(item.jam_selesai, "HH:mm:ss").format("HH:mm")}</Text>
                    <Text style={styles.cell}>{item.zoom}</Text>
                    <Text style={styles.cell}>
                      <View style={styles.actionButtons}>
                        {item.nik === client?.value?.username && (
                          <>
                            <TouchableOpacity
                              style={styles.actionButton}
                              onPress={() =>
                                navigation.navigate("EditPesanHarian", {
                                  id: item.id,
                                  zoom: item.zoom,
                                  hari: item.hari,
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
              ))
            ) : (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 150 }}>
                <Text style={{ fontSize: 15 }}>Tidak ada pemesanan dalam pesan harian zoom ini...</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ListHarian;

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
