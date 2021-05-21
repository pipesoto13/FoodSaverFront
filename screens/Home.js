import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'

export default function products({navigation, route}) {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  
/*   useEffect(() => {
    if (route.params.product) {
      setLoading(true)
      axios({
        method: 'GET',
        baseURL: 'http://192.168.0.11:8000',
        url: '/products'
      })
        .then(({ data }) => {setProducts(data)})
        .catch((err) => {setError(true)})
        .finally(() => setLoading(false))
      console.log(route);
      console.log('navigationn');
    }
  }, [route.params.product]); */

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
  }, [route])

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Algo salió mal</Text>
  return (
    <View>
      <FlatList
        style={styles.productsList}
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
            <View style={styles.productsListContainer}>
              <Image
                style={styles.thumb}
                source={require('../assets/logo.png')}
                />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={{
          bottom: 80,
          left: 130,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddFood')}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#e32f45',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.39,
            shadowRadius: 4.65,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome name="plus" size={34} color="#fefefe" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#fefefe',
  },
  productsListContainer: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    height: 120,
    margin: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.39,
    shadowRadius: 4.65,
    elevation: 8,
  },
  thumb: {
    height: 120,
    width: 120,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  infoContainer: {
    padding: 15,
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
