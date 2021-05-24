import React, { useContext, useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, Dimensions, StyleSheet, TextInput, ActivityIndicator, Platform, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient'


const Profile = ({route, navigation}) => {

  const [image, setImage] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profilePhoto, setprofilePhoto] = useState(null)
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
    const userToken = await AsyncStorage.getItem('userToken')

    const dataUser = new FormData();
    dataUser.append('name', name);
    dataUser.append('email', email);
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
      <SafeAreaView style={styles.container}>
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

        <View style={styles.nameContainer}>
          <TextInput 
            style={styles.text}
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>     

        <View style={styles.footer}>
          <View style={styles.infoContainer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.inputContainer}>
              <FontAwesome 
                  name="user-o"
                  color="#52575D"
                  size={20}
              />
              <TextInput
                placeholder="Ingresa tu correo"
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
              />
            </View >
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => updateUserInfo()}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >

              <Text style={[styles.textSign, {
                color:'#fff'
              }]}>Actualizar mi perfil</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => signOut()}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
              }]}
            >
              <Ionicons name="exit-outline" size={34} color="#009387"></Ionicons>
              <Text style={[styles.textSign, {
                color: '#009387'
              }]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>      
      </SafeAreaView>
    );
};

export default Profile;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fefefe",
    flex: 1,
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: 25,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
  nameContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 15,
  },
  footer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  infoContainer: {
    paddingVertical: 10,
  },
  text: {
    color: "#52575D",
    fontWeight: "200", 
    fontSize: 36 
  },
  text_footer: {
    color: '#52575D',
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -2,
    paddingLeft: 30,
    color: '#52575D',
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
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
});
