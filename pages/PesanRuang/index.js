import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { Gap, Header, TextInput, Button } from "../../components";
import { useForm, showMessage } from "../../utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { insertBookingAction } from "../../redux/action/auth";
import { useNavigation } from "@react-navigation/native";

const PesanRuang = ({ route }) => {
  const dispatch = useDispatch();
  const { nama } = route.params;
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeMulai, setTimeMulai] = useState(new Date());
  const [timeSelesai, setTimeSelesai] = useState(new Date());
  const [showTimeMulaiPicker, setShowTimeMulaiPicker] = useState(false);
  const [showTimeSelesaiPicker, setShowTimeSelesaiPicker] = useState(false);

  const [form, setForm] = useForm({
    tanggal: "",
    jam_mulai: "",
    jam_selesai: "",
    jumlah_peserta: "",
    ruang: nama,
  });

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
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

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setForm("tanggal", formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const formatTime = (rawDate) => {
    let date = new Date(rawDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  const confirmIOSDate = () => {
    setForm("tanggal", formatDate(date));
    toggleDatePicker();
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
    if (!form.tanggal || !form.jam_mulai || !form.jam_selesai || !form.jumlah_peserta) {
      showMessage("Mohon lengkapi semua data", "danger");
    } else {
      console.log("Submitting form:", form); // Add logging here
      dispatch(insertBookingAction(form, navigation));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <Header title={`Pesan Ruang ${nama}`} onBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <View>
            {showDatePicker && <DateTimePicker mode="date" display="spinner" value={date} onChange={onDateChange} style={styles.datePicker} maximumDate={new Date("2025-12-31")} minimumDate={new Date("2005-1-1")} />}

            {showDatePicker && Platform.OS === "ios" && (
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity style={[styles.button, styles.pickerButton, { backgroundColor: "#11182711" }]} onPress={confirmIOSDate}>
                  <Text style={[styles.buttonText, { color: "#075985" }]}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pickerButton, { backgroundColor: "#11182711" }]} onPress={toggleDatePicker}>
                  <Text style={[styles.buttonText]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showDatePicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput label="Tanggal" placeholder="Pilih tanggal" value={form.tanggal} editable={false} onPressIn={toggleDatePicker} />
              </Pressable>
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
                <TextInput label="Jam Mulai" placeholder="Pilih jam mulai" value={form.jam_mulai} editable={false} onPressIn={toggleTimeMulaiPicker} />
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
                <TextInput label="Jam Selesai" placeholder="Pilih jam selesai" value={form.jam_selesai} editable={false} onPressIn={toggleTimeSelesaiPicker} />
              </Pressable>
            )}
          </View>
          <Gap height={12} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput label="Jumlah Peserta" placeholder="Masukkan jumlah peserta" keyboardType="numeric" value={form.jumlah_peserta} onChangeText={(value) => setForm("jumlah_peserta", value)} />
            </View>
          </TouchableWithoutFeedback>
          <Gap height={12} />
          <TextInput label="Ruang" value={form.ruang} editable={false} />
          <Gap height={42} />
          <Button teks="Pesan Ruang" onPress={onSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PesanRuang;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#005BAC", // Blue background color
  },
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF", // Corrected to white
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 5,
    paddingBottom: 200,
    overflow: "hidden", // Ensures the border radius works properly
  },
  datePicker: {
    marginTop: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#11182711", // Background color for buttons
  },
  pickerButton: {
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#005BAC", // Text color for buttons
  },
  pickerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
});
