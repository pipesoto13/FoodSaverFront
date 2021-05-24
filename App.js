import React, { useEffect, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import TabNavigator  from "./navigation/TabNavigator";
import { RootStackNavigator }  from "./navigation/StackNavigator";

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
      dispatch({ type: 'LOGIN', id: validUserId, token: userToken })
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
          <RootStackNavigator/>
        ) : (      
          <TabNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

