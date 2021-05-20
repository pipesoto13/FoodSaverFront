import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

export default function ProductDetails() {
  const route = useRoute()

  const [product, setProduct] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'GET',
      baseURL: 'http://192.168.0.11:8000',
      url: `/products/${route.params.id}`
    })
      .then(({ data }) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      <Text>{!!product && product.name}</Text>
      <Text>{!!product && product.description}</Text>
      <Text>{!!product && product.id}</Text>
      <Text>Pagina Producto</Text>
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