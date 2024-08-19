import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useForm } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getKritikAction, kritikAction } from "../../redux/action/auth";

const Saran = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.dataKritikReducer);
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    deskripsi: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getKritikAction());
    }, [dispatch])
  );

  const onSubmit = () => {
    if (!form.deskripsi) {
      Alert.alert("Invalid Data", "Deskripsi harus terisi!");
    } else {
      dispatch(kritikAction(form, navigation));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header title="Kritik & Saran" subTitle="Berikan Umpan Balik Anda" onBack={() => navigation.goBack()} />
        <View style={styles.content}>
          <Text style={styles.label}>Keterangan</Text>
          <TextInput style={styles.textarea} placeholder="Masukkan keterangan Anda di sini" value={form.deskripsi} onChangeText={(value) => setForm("deskripsi", value)} />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Kirim</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Tanggal</Text>
            <Text style={styles.headerCell}>Nama</Text>
            <Text style={styles.headerCell}>Deskripsi</Text>
          </View>
          <ScrollView>
            {data?.dataKritik?.dataKritik?.data?.length > 0 ? (
              data.dataKritik.dataKritik.data.map((item, index) => (
                <TouchableOpacity key={index.toString()}>
                  <View style={styles.row}>
                    <Text style={styles.cell}>{item.tanggal}</Text>
                    <Text style={styles.cell}>{item.nama}</Text>
                    <Text style={styles.cell}>{item.deskripsi}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Tidak ada Kritik & Saran yang terisi...</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Saran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005BAC", // Blue background for the container
  },
  content: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff", // White background for the content area
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
    marginTop: 10,
  },
  textarea: {
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#005BAC", // Blue color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff", // White text color for the button
    fontSize: 16,
  },
  table: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 0.3,
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
    color: "#000000",
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
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  noDataText: {
    fontSize: 15,
    color: "#495057",
  },
});
