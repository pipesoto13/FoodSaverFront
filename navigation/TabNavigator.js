import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { MainStackNavigator, MapStackNavigator, ProfileStackNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#fefefe',
        inactiveTintColor: '#49274A',
        activeBackgroundColor: '#94618E',
        inactiveBackgroundColor: '#94618E',
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={MainStackNavigator} 
        options={{
          tabBarColor: '#94618E',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='home'
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
          tabBarColor: '#94618E',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='map'
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
          tabBarColor: '#94618E',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='person'
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