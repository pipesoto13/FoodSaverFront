import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { AuthContext } from '../components/context'


export default function products() {

  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'GET',
      baseURL: 'http://192.168.0.11:8000',
      url: '/products'
    })
      .then(({ data }) => {setProducts(data)})
      .catch((err) => {setError(true)})
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Algo salió mal</Text>
  return (
    <View>
      <FlatList
        style={styles.productsList}
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productsListContainer}>
            <Image
              style={styles.thumb}
              source={require('../assets/logo.png')}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Button
                title="View more"
                onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Salir"
        onPress={() => signOut()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#fafafa',
  },
  productsListContainer: {
    backgroundColor: '#fafafa',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
})
