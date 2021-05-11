import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SellerRegisterForm from "./components/SellerRegisterForm";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Form" component={SellerRegisterForm}/>
        <Tab.Screen name="Home" component={SellerRegisterForm}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

