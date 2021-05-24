import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import MapView from 'react-native-maps'

export default function ProductDetails({navigation}) {
  const route = useRoute()

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log(route)



  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      <Text>Mapa</Text>
      <MapView style={styles.map} />
    </View>
  )
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: height,
  },
})