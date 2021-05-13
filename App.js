import React, { useEffect, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Splash from "./screens/Splash";
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  
  const authContext = React.useMemo(() => ({
    signIn: async(email, password) => {
    
      let userToken
      let validUserId
      userToken = null
      try {
        const { data: { token, validUser } } = await axios({
          method: 'POST',
          baseURL: 'http://192.168.0.11:8000',
          url: '/users/signin',
          data: {
            email,
            password,
          }
      });
        userToken = token
        validUserId = validUser.id
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: validUserId, token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  const {isLoading, userToken} = loginState

  if(isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      {userToken == null ? (
        <Stack.Navigator>
          <Tab.Screen name="Splash" component={Splash}/>
          <Tab.Screen name="Login" component={Login}/>
          <Tab.Screen name="Registro" component={Register}/>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={focused ? 'home' : 'home-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Form') {
                return (
                  <Ionicons
                    name={focused ? 'settings' : 'settings-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={Home}/>
        </Tab.Navigator>
      )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

