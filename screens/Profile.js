import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator, Platform, Image, Alert } from 'react-native';
import { AuthContext } from '../components/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import jwt_decode from "jwt-decode"
import * as ImagePicker from 'expo-image-picker'
import mime from "mime";


const Profile = ({route, navigation}) => {

  const [cameraRollPermission, setCameraRollPermission] = useState('denied')
  const [cameraPermission, setCameraPermission] = useState(false)
  const [image, setImage] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profilePhoto, setprofilePhoto] = useState(null)
  const [address, setAddress] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

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

  const updateUserInfo = async () => {
    console.log(name, email, address);
    const userToken = await AsyncStorage.getItem('userToken')

    const dataUser = new FormData();
    dataUser.append('name', name);
    dataUser.append('email', email);
    dataUser.append('address', address);
    if (image) {
      dataUser.append('photo', {
        uri: image.uri,
        type: mime.getType(image.uri),
        name: image.uri.split("/").pop(),
      })
    }

    console.log(dataUser);
    try {
      await axios({
        method: 'PUT',
        baseURL: 'http://192.168.0.11:8000',
        url: `/users`,
        data: dataUser,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        } 
      })
      alert('Usuario actualizado')
    } catch (e) {
      console.log(e);
    }
  }
  
  const getUserId = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userTokenDecoded = jwt_decode(userToken)
    const userId = userTokenDecoded.userId
    try {
      console.log(userToken);
      if (userId !== null) {
        setLoading(true)
        axios({
          method: 'GET',
          baseURL: 'http://192.168.0.11:8000',
          url: `/users/${userId}`,
        })
          .then(({ data }) => {
            setName(data.name)
            setEmail(data.email)
            setAddress(data.address)
            setprofilePhoto(data.photo)
          })
          .catch((err) => {setError(true)})
          .finally(() => setLoading(false))
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    getUserId()
  }, [navigation])

  //if(loading) return <ActivityIndicator />
  //if(error) return <Text>Algo salió mal</Text>
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        {!!image && !profilePhoto && (
          <Image
            style={styles.image}
            source={{ uri: image.uri }}
          />
        )}
        {!!profilePhoto && (
          <Image
            style={styles.image}
            source={{ uri: profilePhoto }}
          />
        )}
        <Button
          title="Pick Image"
          onPress={handlePickImage}
        />
        <TextInput
          placeholder="Ingresa nombre"
          onChangeText={text => setName(text)}
          value={name}
          //style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          //style={styles.textInput}
        />
        <TextInput
          placeholder="Dirección"
          onChangeText={text => setAddress(text)}
          value={address}
          //style={styles.textInput}
        />
        <Button
          title="Salir"
          onPress={() => signOut()}
        />
        <Button
          title="Actualizar"
          onPress={() => updateUserInfo()}
        />
        {!!image && <Text>{image.uri}</Text>}
      </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    width: 400,
    height: 300,
  }
});
