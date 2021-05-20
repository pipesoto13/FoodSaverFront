import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

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