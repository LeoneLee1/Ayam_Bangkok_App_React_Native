import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAbsenAction } from "../../redux/action";
import moment from "moment";

const Absen = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.dataAbsenReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAbsenAction());
    }, [dispatch])
  );

  const totalPages = Math.ceil((data?.absen?.data?.length || 0) / itemsPerPage);
  const currentItems = data?.absen?.data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  return (
    <View style={styles.container}>
      <Header title="Data Absen" onBack={() => navigation.goBack()} />
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>No</Text>
          <Text style={styles.headerCell}>Tanggal</Text>
          <Text style={styles.headerCell}>Berangkat</Text>
          <Text style={styles.headerCell}>Pulang</Text>
        </View>
        <ScrollView>
          {currentItems?.length > 0 ? (
            currentItems.map((item, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>
                <Text style={styles.cell}>{item.tanggal ? moment(item.tanggal).format("DD MMM YYYY") : null}</Text>
                <Text style={styles.cell}>{item.berangkat ? moment(item.berangkat, "HH:mm:ss").format("HH:mm") : null}</Text>
                <Text style={styles.cell}>{item.pulang ? moment(item.pulang, "HH:mm:ss").format("HH:mm") : null}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Tidak ada data...</Text>
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
  );
};

export default Absen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005BAC", // Blue background for the container
  },
  table: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff", // White background for the table
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#000000", // White text color for the header
    textAlign: "center",
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    marginBottom: Platform.OS === "ios" ? 153 : 185,
  },
  paginationButton: {
    backgroundColor: "#005BAC", // Blue color for pagination buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#b0c4de", // Light gray color for disabled state
  },
  paginationButtonText: {
    color: "#ffffff", // White text color for buttons
  },
  paginationText: {
    color: "#495057",
  },
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  noDataText: {
    fontSize: 15,
    color: "#495057", // Color for no data text
  },
});
