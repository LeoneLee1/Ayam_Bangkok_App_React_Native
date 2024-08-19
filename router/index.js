import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, SplashScreen, Home, Order, Settings, Booking, MenuAll, Zoom, ListBooking, PesanZoom, PesanRuang, EditBooking, Kantor, Kandang, ListZoom, EditZoom, Absen, Saran, ListHarian, PesanHarian, EditPesanHarian } from "../pages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigator } from "../components";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Menu" component={MenuAll} />
      <Tab.Screen name="Booking" component={Booking} />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
      <Tab.Screen name="Zoom" component={Zoom} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

      {/* Home Screen  */}
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen name="ListBooking" component={ListBooking} options={{ headerShown: false }} />
      <Stack.Screen name="PesanRuang" component={PesanRuang} options={{ headerShown: false }} />
      <Stack.Screen name="EditBooking" component={EditBooking} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="Kantor" component={Kantor} options={{ headerShown: false }} />
      <Stack.Screen name="Kandang" component={Kandang} options={{ headerShown: false }} />
      <Stack.Screen name="ListZoom" component={ListZoom} options={{ headerShown: false }} />
      <Stack.Screen name="PesanZoom" component={PesanZoom} options={{ headerShown: false }} />
      <Stack.Screen name="EditZoom" component={EditZoom} options={{ headerShown: false }} />
      <Stack.Screen name="Absen" component={Absen} options={{ headerShown: false }} />
      <Stack.Screen name="Saran" component={Saran} options={{ headerShown: false }} />
      <Stack.Screen name="MenuAll" component={MenuAll} options={{ headerShown: false }} />
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="ListHarian" component={ListHarian} options={{ headerShown: false }} />
      <Stack.Screen name="PesanHarian" component={PesanHarian} options={{ headerShown: false }} />
      <Stack.Screen name="EditPesanHarian" component={EditPesanHarian} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Router;
