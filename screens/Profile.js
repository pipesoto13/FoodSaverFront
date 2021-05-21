import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { AuthContext } from '../components/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import jwt_decode from "jwt-decode"

const Profile = ({route, navigation}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signOut } = useContext(AuthContext)

  const updateUserInfo = async () => {
    console.log(name, email, address);
    const userToken = await AsyncStorage.getItem('userToken');
    const userTokenDecoded = jwt_decode(userToken)
    const userId = userTokenDecoded.userId
    if (userId !== null) {
      try {
        await axios({
          method: 'PUT',
          baseURL: 'http://192.168.0.11:8000',
          url: `/users/${userId}`,
          data: {
            name,
            email,
            password: 111,
            address,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          } 
        })
      } catch (e) {
        console.log(e);
      }
    }
  }
  
  const getUserId = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userTokenDecoded = jwt_decode(userToken)
    const userId = userTokenDecoded.userId
    try {
      console.log(userToken);
      if (userId !== null) {
        setLoading(true)
        axios({
          method: 'GET',
          baseURL: 'http://192.168.0.11:8000',
          url: `/users/${userId}`,
        })
          .then(({ data }) => {
            console.log(data);
            setName(data.name)
            setEmail(data.email)
            setAddress(data.address)
          })
          .catch((err) => {setError(true)})
          .finally(() => setLoading(false))
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    getUserId()
  }, [navigation])

  //if(loading) return <ActivityIndicator />
  //if(error) return <Text>Algo salió mal</Text>
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <TextInput
          placeholder="Ingresa nombre"
          onChangeText={text => setName(text)}
          value={name}
          //style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          //style={styles.textInput}
        />
        <TextInput
          placeholder="Dirección"
          onChangeText={text => setAddress(text)}
          value={address}
          //style={styles.textInput}
        />
        <Button
          title="Salir"
          onPress={() => signOut()}
        />
        <Button
          title="Actualizar"
          onPress={() => updateUserInfo()}
        />
      </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
