import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Gap, Header, TextInput, Button } from "../../components";
import { useForm, showMessage } from "../../utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateBookingAction } from "../../redux/action";

const EditBooking = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id, ruang, tanggal, jam_mulai, jam_selesai, jumlah_peserta } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeMulai, setTimeMulai] = useState(new Date());
  const [timeSelesai, setTimeSelesai] = useState(new Date());
  const [showTimeMulaiPicker, setShowTimeMulaiPicker] = useState(false);
  const [showTimeSelesaiPicker, setShowTimeSelesaiPicker] = useState(false);

  const [form, setForm] = useForm({
    tanggal: tanggal,
    jam_mulai: jam_mulai,
    jam_selesai: jam_selesai,
    jumlah_peserta: jumlah_peserta,
    ruang: ruang,
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
    dispatch(updateBookingAction(id, form, navigation));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <Header title={`Edit Booking ${id}`} onBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <View>
            {showDatePicker && <DateTimePicker mode="date" display="spinner" value={date} onChange={onDateChange} style={styles.datePicker} maximumDate={new Date("2024-12-31")} minimumDate={new Date("2005-1-1")} />}

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
                <TextInput label="Tanggal" placeholder={`${tanggal}`} value={form.tanggal} editable={false} onPressIn={toggleDatePicker} />
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
            <TextInput label="Jumlah Peserta" keyboardType="numeric" value={form.jumlah_peserta} onChangeText={(value) => setForm("jumlah_peserta", value)} />
          </View>
          <Gap height={12} />
          <View>
            <TextInput label="Ruang" value={ruang} onChangeText={(value) => setForm("ruang", value)} editable={false} />
          </View>
          <Gap height={24} />
          <Button teks="SIMPAN" color="#005BAC" textColor="white" onPress={onSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditBooking;

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
