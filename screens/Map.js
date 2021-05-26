import React, { useState, useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native'
import axios from 'axios'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function ProductDetails({navigation}) {

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [location, setLocation] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      /* let location = await Location.getCurrentPositionAsync({
        accuracy: 1,
      });
      setLocation(location); */
    })();
  }, []);

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
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 6.2476,
          longitude: -75.5658,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {!!products && products.map((product) => (
          
          <Marker
            key={product.id}
            coordinate={{
              latitude: product.latLoc,
              longitude: product.longLoc,
            }}
            title={product.name}
            onCalloutPress={() => navigation.navigate('ProductDetails', { id: product.id })}
          >
            <View>
              <Text numberOfLines={1} style={styles.marker}>{product.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
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
  marker: {
    color: '#fefefe',
    backgroundColor: '#49274A',
    padding: 5,
    borderRadius: 10,
    maxWidth: 60,
  }
})