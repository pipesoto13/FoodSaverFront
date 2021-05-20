import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { MainStackNavigator, MapStackNavigator, ProfileStackNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="tomato"
    >
      <Tab.Screen 
        name="Inicio" 
        component={MainStackNavigator} 
        options={{
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='home'//{focused ? 'home' : 'home-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Mapa" 
        component={MapStackNavigator}
        options={{
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='map'//{focused ? 'settings' : 'settings-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileStackNavigator}
        options={{
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='person'//{focused ? 'settings' : 'settings-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator