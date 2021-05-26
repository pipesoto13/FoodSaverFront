import React, { useState, useEffect } from 'react'
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { Marker } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import jwt_decode from "jwt-decode"

export default function ProductDetails({navigation}) {
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

  const updateProductRequest = async (userId) => {
    const dataFood = new FormData();
    dataFood.append('requested', true);
    try {
      if (userId !== null) {
        const { data } = await axios({
          method: 'PUT',
          baseURL: 'http://192.168.0.11:8000',
          url: `/products/${route.params.id}`,
          data: dataFood,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      }
    } catch(e) {
      console.log(e);
    }
  }

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
      updateProductRequest(clientId)
      setLoading(false)
    } catch (e) {
      console.log(e);
      setError(true)
    }
    navigation.navigate('Home');
  }

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {!!product && (
        <Image
          style={styles.foodImage}
          source={{ uri: product.photo }}
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{!!product && product.name}</Text>
        <Text style={styles.description}>{!!product && product.description}</Text>
        <Text style={styles.price}>{!!product && (product.price=='0'? 'GRATIS':`$ ${product.price}`)}</Text>
        <View>
          <Text style={styles.expDate}>Fecha de vencimiento:</Text>
          <Text style={styles.expDate}>{!!product && product.expDate}</Text>
        </View>
        <View>
          <Text style={styles.location}>Información y Ubicación aproximada</Text>
          <Text style={styles.description}>{!!product && product.address}</Text>
          <View style={styles.mapContainer}>
            {!!product &&
              <MapView 
                style={styles.map}
                initialRegion={{
                  latitude: product.latLoc,
                  longitude: product.longLoc,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {!!product && 
                  <Marker
                  coordinate={{
                    latitude: product.latLoc,
                    longitude: product.longLoc,
                  }}
                  title={product.name}
                  />
                }
              </MapView>
            }
          </View>
            <TouchableOpacity
              style={styles.signIn}
              onPress={requestProduct}
            >
              <LinearGradient
                colors={['#94618E', '#49274A']}
                style={styles.signIn}
              >
              <Text style={[styles.textSign, {
                color:'#fefefe'
              }]}>Solicitar Producto</Text>
              </LinearGradient>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EEE7",
    flex: 1,
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: 25,
  },
  foodImage: {
    width: width,
    height: 300,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  description: {
    paddingVertical: 15,
    fontSize: 18,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  expDate: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: 14,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: 300,
  },
  signIn: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})