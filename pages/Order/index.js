import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Switch, Pressable, Alert, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Header } from "../../components";
import { getOrderAction, submitKusionerAction, updateOrderAction } from "../../redux/action";
import { useForm } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";

const MenuTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderReducer);
  const orders = data.orders || [];
  const date = data.tanggal || [];

  const [modalVisible, setModalVisible] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  const [form, setForm] = useForm({
    rating: "",
    saran: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getOrderAction());
    }, [dispatch])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (data.submit === false) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    }, [data.submit])
  );

  useEffect(() => {
    if (data.submit === false) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [data.submit]);

  const handleSwitchToggle = (id, newValue) => {
    const pesan = newValue ? "PESAN" : "TIDAK";
    dispatch(updateOrderAction(id, pesan));
  };

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  // };

  const onSubmit = () => {
    if (!form.rating || !form.saran) {
      Alert.alert("Mohon Maaf", "Tolong Di isi!");
      return;
    }
    dispatch(submitKusionerAction(form));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          handleCloseModal();
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Review Makan Siang Kemarin</Text>
              <Text style={styles.modalText}>Salam Mustika, Kami PIC Menu Makan Siang ingin meminta saran & masukan dari teman-teman HO terkait menu makan siang. Terima Kasih</Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>1. Berikan Rating pada menu makan siang (1 - 10)</Text>
                <TextInput style={styles.input} value={form.rating} onChangeText={(value) => setForm("rating", value)} placeholder="1 - 10" keyboardType="numeric" maxLength={2} />
              </View>
              <Gap height={12} />
              <View style={styles.formGroup}>
                <Text style={styles.label}>2. Alasan anda memberikan Rating tersebut?</Text>
                <TextInput style={[styles.input, styles.textarea]} value={form.saran} onChangeText={(value) => setForm("saran", value)} placeholder="Bisa Komplain/Masukkan/Saran" multiline numberOfLines={4} />
              </View>
              <Gap height={24} />
              <Button teks="SIMPAN" color="#106eea" teksColor="white" onPress={onSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* // */}
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <ScrollView>
            <View>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Hari</Text>
                <Text style={styles.headerCell}>Menu Makan</Text>
                <Text style={styles.headerCell}>Pesan</Text>
              </View>
              {orders.length > 0 ? (
                orders.map((item, index) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.cell1}>{item.hari}</Text>
                    <Text style={styles.cell2}>{item.menu}</Text>
                    <Switch
                      style={styles.switch}
                      value={item.pesan === "PESAN"}
                      onValueChange={(newValue) => handleSwitchToggle(item.id, newValue)}
                      disabled={item.kunci === "false"}
                      trackColor={{ false: "#767577", true: "#106eea" }}
                      thumbColor={item.pesan === "PESAN" ? "yellow" : "#f4f3f4"}
                    />
                    {/* <Switch style={styles.switch} value={item.pesan === "PESAN"} onValueChange={(newValue) => handleSwitchToggle(item.id, newValue)} disabled={item.kunci === "false"} /> */}
                  </View>
                ))
              ) : (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 150 }}>
                  <Text style={{ fontSize: 15 }}>Tidak ada pemesanan makanan...</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const Order = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#005BAC" }}>
      <Header title="Order Makanan" />
      <MenuTable />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F7F7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardBody: {
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#106eea",
    backgroundColor: "#f2f9ff",
  },
  headerCell: {
    flex: 1,
    padding: 8,
    fontWeight: "bold",
    color: "#106eea",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  cell1: {
    flex: 1,
    padding: 8,
    color: "#333",
    textAlign: "center",
  },
  cell2: {
    flex: 1,
    padding: 8,
    color: "#333",
    textAlign: "left",
  },
  switch: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    zIndex: 1000,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#106eea",
  },
  modalText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 15,
    color: "#333",
  },
  formGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
});
