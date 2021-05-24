import React, { useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import jwt_decode from "jwt-decode"

export default function ProductDetails({navigation, route}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState('')
  const [expDate, setExpDate] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const registerAlert = () => 
  Alert.alert(
    "Comida creada satisfactoriamente",
    "Sigue cuidando el planeta.",
    [
      { text: "OK" }
    ]
  );

  const addFood = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userTokenDecoded = jwt_decode(userToken)
    const sellerId = userTokenDecoded.userId
    try {
      if (sellerId !== null) {
        const { data } = await axios({
          method: 'POST',
          baseURL: 'http://192.168.0.11:8000',
          url: '/products',
          data: {
            name: title,
            description,
            price: 0,
            weight,
            expDate,
            address: 'LatLong',
            sellerId,
          }
      })
      registerAlert()
    }
    console.log(`Adicionado: ${title}, ${description}, con peso ${weight}, y fecha ${expDate}`);
  } catch(e) {
    console.log(e);
  }
  navigation.navigate({
    name: 'Home',
    params: { product: title },
    merge: true,
  });
}

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      <TextInput
        placeholder="Ingresa un título"
        onChangeText={text => setTitle(text)}
        value={title}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Descripción"
        onChangeText={text => setDescription(text)}
        value={description}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Peso"
        onChangeText={text => setWeight(text)}
        value={weight}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Fecha"
        onChangeText={text => setExpDate(text)}
        value={expDate}
        style={styles.textInput}
      />
      <Button
        onPress={addFood}
        title="Adicionar"
        color="#841584"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})