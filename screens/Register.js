import React, { useState, useContext } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'
import { AuthContext } from '../components/context'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'

function Register({navigation}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerAlert = () => 
    Alert.alert(
      "Usuario creado satisfactoriamente",
      "Favor inicia sesión con tus datos.",
      [
        { text: "OK" }
      ]
    );
  

  async function handleSubmit() {
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: 'http://192.168.0.11:8000',
        url: '/users',
        data: {
          name,
          email,
          password,
        }
    })
    registerAlert()
    navigation.goBack()
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Registrate ahora!</Text>
        </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <Text style={styles.text_footer}>Nombre de Usuario</Text>
        <View style={styles.action}>
          <FontAwesome 
              name="user-o"
              color="#05375a"
              size={20}
          />
          <TextInput
            placeholder="Ingresa tu nombre"
            onChangeText={text => setName(text)}
            style={styles.textInput}
            value={name}
          />
        </View>

        <Text style={[styles.text_footer, {
            marginTop: 35,
          }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome 
              name="user-o"
              color="#05375a"
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
        </View>

        <Text style={[styles.text_footer, {
            marginTop: 35,
          }]}>Contraseña</Text>
          <View style={styles.action}>
            <Feather 
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Ingresa tu contraseña"
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              value={password}
            />
          </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >

            <Text style={[styles.textSign, {
              color:'#fff'
            }]}>Registrase</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.signIn, {
              borderColor: '#009387',
              borderWidth: 1,
              marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
              color: '#009387'
            }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: Platform.OS === 'ios' ? 3 : 5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  }
});