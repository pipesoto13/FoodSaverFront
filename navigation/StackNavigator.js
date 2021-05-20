import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import ProductDetails from "../screens/ProductDetails";
import Map from "../screens/Map";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Splash from "../screens/Splash";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#009387",
  },
  headerTintColor: "#fefefe",
  headerBackTitle: "Back",
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen 
        name="Home" 
        component={Home}
        //options={{ headerShown: false }} 
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const MapStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen 
        name="Map" 
        component={Map}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen 
        name="Perfil" 
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Registro" component={Register}/>
    </Stack.Navigator>
  );
};

export { MainStackNavigator, MapStackNavigator, ProfileStackNavigator, RootStackNavigator };