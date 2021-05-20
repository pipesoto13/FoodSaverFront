import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

export default function ProductDetails({navigation}) {
  const route = useRoute()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState('')
  const [expDate, setExpDate] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log(route)



  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      <Text>Adicionar comida</Text>
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