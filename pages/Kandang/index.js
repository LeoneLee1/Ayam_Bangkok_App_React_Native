import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils";
import { fetchLokasiKandang, getLokasiKandang } from "../../redux/action";
import Icon from "react-native-vector-icons/Ionicons";
import { Linking } from "react-native";

const Kandang = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const data = useSelector((state) => state.kandangDataReducer);
  // console.log(data);

  const totalPages = Math.ceil((data?.kandang?.kandang?.data?.length || 0) / itemsPerPage);
  const currentItems = data?.kandang?.kandang?.data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getLokasiKandang());
    }, [dispatch])
  );

  const handleFetch = () => {
    Alert.alert(
      "Konfirmasi",
      `Apakah Anda yakin ingin memperbarui data ini?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Perbarui",
          onPress: async () => {
            await dispatch(fetchLokasiKandang());
            dispatch(getLokasiKandang());
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // const handleRute = (latitude_gps) => {
  //   const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude_gps}`;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (supported) {
  //         Linking.openURL(url);
  //       } else {
  //         Alert.alert("Error", "Tidak dapat membuka Google Maps, Mohon Download Google Maps Terlebih Dahulu atau Cek Lokasi Layanan.");
  //       }
  //     })
  //     .catch((err) => console.error("An error occurred", err));
  // };

  const handleRute = (latitude_gps) => {
    const url = `geo:0,0?q=${latitude_gps}(Destination)`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude_gps}`;
          Linking.openURL(webUrl);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const renderItem = (item, index) => (
    <TouchableOpacity key={index.toString()} disabled={true}>
      <View style={styles.row}>
        <Text style={styles.cell}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>
        <Text style={styles.cell}>{item.nama_flok}</Text>
        <Text style={styles.cell}>{item.nama_unit}</Text>
        <Text style={styles.cell}>{item.alamat}</Text>
        <Text style={styles.cell}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleRute(item.latitude_gps)}>
            <Icon name="map-outline" size={18} color="blue" />
          </TouchableOpacity>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Lokasi Kandang" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleFetch}>
            <Icon name="sync-circle" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Perbarui Data</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>No</Text>
            <Text style={styles.headerCell}>Flok</Text>
            <Text style={styles.headerCell}>Unit</Text>
            <Text style={styles.headerCell}>Alamat</Text>
            <Text style={styles.headerCell}>Aksi</Text>
          </View>
          <ScrollView>
            {currentItems?.length > 0 ? (
              currentItems.map(renderItem)
            ) : (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 150 }}>
                <Text style={{ fontSize: 15 }}>Tidak ada data...</Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1} style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}>
              <Text style={styles.paginationButtonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>{`Page ${currentPage} of ${totalPages}`}</Text>
            <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages} style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Kandang;

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
  actionButton: {
    paddingHorizontal: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  paginationButton: {
    backgroundColor: "#005BAC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#b0c4de",
  },
  paginationButtonText: {
    color: "#ffffff",
  },
  paginationText: {
    color: "#495057",
  },
});
