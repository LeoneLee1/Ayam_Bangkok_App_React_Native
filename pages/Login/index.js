import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Button, TextInput, Gap } from "../../components";
import useForm from "../../utils/useForm";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/auth";
import { showMessage } from "react-native-flash-message";

const Login = ({ navigation }) => {
  const [form, setForm] = useForm({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!form.username || !form.password) {
      showMessage({
        message: "Error",
        description: "Username and Password tidak bisa kosong",
        type: "danger",
      });
      return;
    } else {
      dispatch(loginAction(form, navigation));
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image source={require("../../assets/img/Ilustration/logo oval mustika.png")} style={styles.logo} resizeMode="contain" />
        <TextInput label="Username" placeholder="NIK" value={form.username} onChangeText={(value) => setForm("username", value)} />
        <Gap height={16} />
        <TextInput label="Password" placeholder="*********" value={form.password} onChangeText={(value) => setForm("password", value)} secureTextEntry />
        <Gap height={24} />
        <Button teks="LOGIN" color="#106eea" teksColor="white" onPress={onSubmit} />
        <Gap height={16} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 13,
  },
});
