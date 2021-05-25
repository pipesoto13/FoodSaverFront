import React, { useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TextInput, Image, Alert, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import * as ImagePicker from 'expo-image-picker'
import mime from "mime";
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient'
import MapView, { Marker } from 'react-native-maps'


export default function ProductDetails({navigation, route}) {

  const [image, setImage] = useState(null)
  
  const [profilePhoto, setprofilePhoto] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  const [expDate, setExpDate] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lat, setLat] = useState(6.2599091)
  const [long, setLong] = useState(-75.6091692)

  const registerAlert = () => 
  Alert.alert(
    "Comida creada satisfactoriamente",
    "Sigue cuidando el planeta.",
    [
      { text: "OK" }
    ]
  );

  async function handlePickImage() {
    const dataImage = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })

    console.log(dataImage);

    if(!dataImage.cancelled) {
      setImage(dataImage)
      setprofilePhoto(null)
    }
  }

  const addFood = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userTokenDecoded = jwt_decode(userToken)
    const sellerId = userTokenDecoded.userId

    const dataFood = new FormData();
    dataFood.append('name', name);
    dataFood.append('description', description);
    dataFood.append('price', price);
    dataFood.append('address', address);
    dataFood.append('expDate', expDate);
    dataFood.append('latLoc', lat);
    dataFood.append('longLoc', long);
    dataFood.append('sellerId', sellerId);
    if (image) {
      dataFood.append('photo', {
        uri: image.uri,
        type: mime.getType(image.uri),
        name: image.uri.split("/").pop(),
      })
    }
    try {
      if (sellerId !== null) {
        const { data } = await axios({
          method: 'POST',
          baseURL: 'http://192.168.0.11:8000',
          url: '/products',
          data: dataFood,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        registerAlert()
      }
      console.log(`Adicionado: ${name}, ${description}, con costo ${price}, y fecha ${expDate}`);
    } catch(e) {
      console.log(e);
    }
    navigation.navigate({
      name: 'Home',
      params: { product: name },
      merge: true,
    });
  }

  const handleDragEnd = (e) => {
    setLat(e.nativeEvent.coordinate.latitude)
    setLong(e.nativeEvent.coordinate.longitude)
  }


  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.profileImage}>
            {!!image && !profilePhoto && (
              <Image
                style={styles.image}
                source={{ uri: image.uri }}
              />
            )}
            {!!profilePhoto && (
              <Image
                style={styles.image}
                source={{ uri: profilePhoto }/* require('../assets/logo.png') */}
              />
            )}
          </View>
          <TouchableOpacity style={styles.addContainer} onPress={handlePickImage}>
            <View style={styles.add}>
              <Ionicons name="camera" size={34} color="#fefefe"></Ionicons>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.text_footer}>Título</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ingresa un título"
              onChangeText={text => setName(text)}
              style={styles.textInput}
              value={name}
            />
          </View>

          <Text style={styles.text_footer}>Descripción</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="ej. 4 panes, traer bolsa para recogerlos"
              onChangeText={text => setDescription(text)}
              style={styles.textInput}
              value={description}
            />
          </View>

          <Text style={styles.text_footer}>Precio</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ingresa 0 si deseas donarlo"
              onChangeText={text => setPrice(text)}
              value={price}
              style={styles.textInput}
            />
          </View>

          <Text style={styles.text_footer}>Fecha caducidad</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="2021-07-23"
              onChangeText={text => setExpDate(text)}
              value={expDate}
              style={styles.textInput}
            />
          </View>

          <Text style={styles.text_footer}>Direccion de recolección</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Calle 65, apto 303..."
              onChangeText={text => setAddress(text)}
              value={address}
              style={styles.textInput}
            />
          </View>

          <View>
            <Text style={styles.text_footer}>Tu ubicación (aproximadamente)</Text>
            <View style={styles.mapContainer}>
              <MapView 
                style={styles.map}
                initialRegion={{
                  latitude: 6.2599091,
                  longitude: -75.6091692,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  draggable
                  coordinate={{
                    latitude: lat,
                    longitude: long,
                  }}
                  onDragEnd={handleDragEnd}
                  title="Recolección"
                />
              </MapView>
            </View>
            <TouchableOpacity
              style={styles.signIn}
              onPress={addFood}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
              <Text style={[styles.textSign, {
                color:'#fff'
              }]}>Adicionar Producto</Text>
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
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: 'center',
  },
  imageContainer: {
    alignSelf: 'flex-start',
    paddingTop: 25,
    paddingLeft: 20,
  },
  profileImage: {
    backgroundColor: '#e2e2e2',
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  addContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    backgroundColor: "#41444B",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text_footer: {
    color: '#52575D',
    fontSize: 18,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 4,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    color: '#52575D',
    fontSize: 16,
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
    fontWeight: 'bold',
  },
})