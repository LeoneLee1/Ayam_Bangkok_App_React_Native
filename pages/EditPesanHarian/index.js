import { Platform, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import React, { useState } from "react";
import { Gap, Header, TextInput, Button } from "../../components";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { showMessage, useForm } from "../../utils";
import { updatePesanHarianAction } from "../../redux/action";

const EditPesanHarian = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, zoom, hari, jam_mulai, jam_selesai } = route.params;

  const [timeMulai, setTimeMulai] = useState(new Date());
  const [timeSelesai, setTimeSelesai] = useState(new Date());
  const [showTimeMulaiPicker, setShowTimeMulaiPicker] = useState(false);
  const [showTimeSelesaiPicker, setShowTimeSelesaiPicker] = useState(false);
  const [showHariPicker, setShowHariPicker] = useState(false);
  const [showZoomPicker, setShowZoomPicker] = useState(false);

  const [form, setForm] = useForm({
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
    zoom: zoom,
  });

  const toggleHariPicker = () => {
    setShowHariPicker(!showHariPicker);
  };

  const toggleZoomPicker = () => {
    setShowZoomPicker(!showZoomPicker);
  };

  const toggleTimeMulaiPicker = () => {
    setShowTimeMulaiPicker(!showTimeMulaiPicker);
  };

  const toggleTimeSelesaiPicker = () => {
    setShowTimeSelesaiPicker(!showTimeSelesaiPicker);
  };

  const onTimeMulaiChange = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTimeMulai = selectedTime || timeMulai;
      setTimeMulai(currentTimeMulai);
      if (Platform.OS === "android") {
        toggleTimeMulaiPicker();
        setForm("jam_mulai", formatTime(currentTimeMulai));
      }
    } else {
      toggleTimeMulaiPicker();
    }
  };

  const onTimeSelesaiChange = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTimeSelesai = selectedTime || timeSelesai;
      setTimeSelesai(currentTimeSelesai);
      if (Platform.OS === "android") {
        toggleTimeSelesaiPicker();
        setForm("jam_selesai", formatTime(currentTimeSelesai));
      }
    } else {
      toggleTimeSelesaiPicker();
    }
  };

  const formatTime = (rawDate) => {
    let date = new Date(rawDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  const confirmIOSTimeMulai = () => {
    setForm("jam_mulai", formatTime(timeMulai));
    toggleTimeMulaiPicker();
  };
  const confirmIOSTimeSelesai = () => {
    setForm("jam_selesai", formatTime(timeSelesai));
    toggleTimeSelesaiPicker();
  };

  const onSubmit = () => {
    if (!form.hari || !form.jam_mulai || !form.jam_selesai || !form.zoom) {
      showMessage("Mohon lengkapi semua data", "danger");
    } else {
      dispatch(updatePesanHarianAction(id, form, navigation));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <Header title="Pesan Harian Zoom" onBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>Hari</Text>
            <Pressable onPress={toggleHariPicker} style={styles.pickerContainer}>
              <Text style={styles.pickerText}>{form.hari || `${hari}`}</Text>
            </Pressable>
            {showHariPicker && (
              <Picker
                selectedValue={form.hari}
                onValueChange={(itemValue) => {
                  setForm("hari", itemValue);
                  toggleHariPicker();
                }}
              >
                <Picker.Item label="Pilih hari" value="" />
                <Picker.Item label="SENIN" value="SENIN" />
                <Picker.Item label="SELASA" value="SELASA" />
                <Picker.Item label="RABU" value="RABU" />
                <Picker.Item label="KAMIS" value="KAMIS" />
                <Picker.Item label="JUMAT" value="JUMAT" />
                <Picker.Item label="SABTU" value="SABTU" />
              </Picker>
            )}
          </View>
          <Gap height={12} />
          <View>
            {showTimeMulaiPicker && <DateTimePicker mode="time" display="spinner" value={timeMulai} onChange={onTimeMulaiChange} style={styles.datePicker} />}

            {showTimeMulaiPicker && Platform.OS === "ios" && (
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity style={[styles.button, styles.pickerButton, { backgroundColor: "#11182711" }]} onPress={confirmIOSTimeMulai}>
                  <Text style={[styles.buttonText, { color: "#075985" }]}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pickerButton, { backgroundColor: "#11182711" }]} onPress={toggleTimeMulaiPicker}>
                  <Text style={[styles.buttonText]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showTimeMulaiPicker && (
              <Pressable onPress={toggleTimeMulaiPicker}>
                <TextInput label="Jam Mulai" placeholder={`${jam_mulai}`} value={form.jam_mulai} editable={false} onPressIn={toggleTimeMulaiPicker} />
              </Pressable>
            )}
          </View>
          <Gap height={12} />
          <View>
            {showTimeSelesaiPicker && <DateTimePicker mode="time" display="spinner" value={timeSelesai} onChange={onTimeSelesaiChange} style={styles.datePicker} />}

            {showTimeSelesaiPicker && Platform.OS === "ios" && (
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity style={[styles.button, styles.pickerButton, { backgroundColor: "#11182711" }]} onPress={confirmIOSTimeSelesai}>
                  <Text style={[styles.buttonText, { color: "#075985" }]}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pickerButton, { backgroundColor: "#11182711" }]} onPress={toggleTimeSelesaiPicker}>
                  <Text style={[styles.buttonText]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showTimeSelesaiPicker && (
              <Pressable onPress={toggleTimeSelesaiPicker}>
                <TextInput label="Jam Selesai" placeholder={`${jam_selesai}`} value={form.jam_selesai} editable={false} onPressIn={toggleTimeSelesaiPicker} />
              </Pressable>
            )}
          </View>
          <Gap height={12} />
          <View>
            <Text style={styles.label}>Zoom</Text>
            <Pressable onPress={toggleZoomPicker} style={styles.pickerContainer}>
              <Text style={styles.pickerText}>{form.zoom || `${zoom}`}</Text>
            </Pressable>
            {showZoomPicker && (
              <Picker
                selectedValue={form.zoom}
                onValueChange={(itemValue) => {
                  setForm("zoom", itemValue);
                  toggleZoomPicker();
                }}
              >
                <Picker.Item label="Pilih User Zoom" value="" />
                <Picker.Item label="User 1" value="User 1" />
                <Picker.Item label="User 2" value="User 2" />
                <Picker.Item label="User 3" value="User 3" />
                <Picker.Item label="User 4" value="User 4" />
              </Picker>
            )}
          </View>
          <Gap height={24} />
          <Button teks="SIMPAN" color="#005BAC" teksColor="white" onPress={onSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditPesanHarian;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#005BAC",
  },
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF", // Corrected to white
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 5,
    paddingBottom: 286,
    overflow: "hidden",
  },
  datePicker: {
    marginTop: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  pickerButton: {
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
});
