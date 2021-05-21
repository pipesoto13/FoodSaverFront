import React, { useState, useEffect } from 'react'
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator,
  Button
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import jwt_decode from "jwt-decode"

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

  const requestProduct = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userTokenDecoded = jwt_decode(userToken)
    const clientId = userTokenDecoded.userId
    setLoading(true)
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: 'http://192.168.0.11:8000',
        url: '/orders',
        data: {
          clientId,
          productId: [product.id],
        }
      });
      console.log('producto solicitado');
      setLoading(false)
    } catch (e) {
      console.log(e);
      setError(true)
    }
  }

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      <Text>{!!product && product.name}</Text>
      <Text>{!!product && product.description}</Text>
      <Text>{!!product && product.id}</Text>
      <Text>{!!product && product.address}</Text>
      <Text>{!!product && product.expDate}</Text>
      <Text>Pagina Producto</Text>
      <Button
        onPress={requestProduct}
        title="Solicitar Producto"
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