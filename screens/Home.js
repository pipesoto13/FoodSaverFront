import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'

export default function products({navigation, route}) {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
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
  );

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Algo salió mal</Text>
  return (
    <View style={{
      flexDirection: 'column',
      flex: 1
    }}>
      <FlatList
        style={styles.productsList}
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
            <View style={styles.productsListContainer}>
              <Image
                style={[styles.thumb, {opacity: !item.requested ? 1 : 0.2}]}
                source={{ uri: item.photo }}
              />
              {!!item.requested && <Text style={styles.requested}>Producto Solicitado</Text>}
              <View style={[styles.infoContainer, {opacity: !item.requested ? 1 : 0.2}]}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price=='0'? 'GRATIS':`$ ${item.price}`}</Text>
                <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: 30,
          right: 15,
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
            backgroundColor: '#49274A',
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

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#F8EEE7',
  },
  productsListContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4DECB',
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
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
  requested: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    top: 25,
    left: 6,
    width: 110,
    height: 61,
    padding: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#49274A',
    color: '#fefefe',
  }
})
