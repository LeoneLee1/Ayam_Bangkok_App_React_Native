import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Icon = ({ label, focus }) => {
  switch (label) {
    case "Home":
      return focus ? <Image source={require("../../../assets/img/Icon/icons8-home-50.png")} style={styles.icon} /> : <Image source={require("../../../assets/img/Icon/icons8-home-50-off.png")} style={styles.icon} />;
    case "Order":
      return focus ? <Image source={require("../../../assets/img/Icon/icons8-utensil-50.png")} style={styles.icon} /> : <Image source={require("../../../assets/img/Icon/icons8-utensil-50-off.png")} style={styles.icon} />;
    case "Menu":
      return focus ? <Image source={require("../../../assets/img/Icon/icons8-menu-100.png")} style={styles.iconMenu} /> : <Image source={require("../../../assets/img/Icon/icons8-menu-100-off.png")} style={styles.iconMenu} />;
    case "Booking":
      return focus ? <Image source={require("../../../assets/img/Icon/icons8-door-50.png")} style={styles.icon} /> : <Image source={require("../../../assets/img/Icon/icons8-door-50-off.png")} style={styles.icon} />;
    case "Zoom":
      return focus ? <Image source={require("../../../assets/img/Icon/icons8-zoom-50.png")} style={styles.icon} /> : <Image source={require("../../../assets/img/Icon/icons8-zoom-50-off.png")} style={styles.icon} />;
    default:
      return <Image source={require("../../../assets/img/Icon/icons8-home-50.png")} style={styles.icon} />;
  }
};

const BottomNavigator = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Icon label={label} focus={isFocused} />
            <Text style={label === "Menu" ? (isFocused ? styles.labelMenuFocused : styles.labelMenu) : isFocused ? styles.labelFocused : styles.label}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-around",
    backgroundColor: "#005BAC",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderTopColor: "#005BAC",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  iconMenu: {
    width: 55,
    height: 55,
    marginBottom: 0,
    marginTop: -34,
    position: "relative",
  },
  label: {
    fontSize: 12,
    color: "#aed0e7",
    marginTop: 4,
  },
  labelFocused: {
    fontSize: 12,
    color: "#f4f5f7",
    fontWeight: "bold",
    marginTop: 4,
  },
  labelMenu: {
    fontSize: 12,
    color: "#aed0e7",
    marginTop: 12,
  },
  labelMenuFocused: {
    fontSize: 12,
    color: "#f4f5f7",
    fontWeight: "bold",
    marginTop: 12,
  },
});

export default BottomNavigator;
