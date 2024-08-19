import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Header = ({ title, subTitle, onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
          <View style={styles.back}>
            <Image source={require("../../../assets/img/Icon/icons8-reply-arrow-30.png")} style={styles.icon} />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#005BAC",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    color: "#D1E8FF",
  },
  back: {
    padding: 10,
    marginRight: 16,
    marginLeft: -10,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
