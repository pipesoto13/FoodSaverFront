import React, { useState, useContext } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Alert,
  Button
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../components/context';

function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme();

  const { signIn } = useContext(AuthContext)

  return (
    <View>
      <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
      <View 
        style={[styles.footer, {
        backgroundColor: colors.background
        }]}
      >
        <Text style={[styles.text_footer, {
            color: colors.text
          }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome 
              name="user-o"
              color={colors.text}
              size={20}
          />
          <TextInput
            placeholder="Ingresa tu correo"
            onChangeText={text => setEmail(text)}
            value={email}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <Text style={[styles.text_footer, {
            color: colors.text,
            marginTop: 35
          }]}>Contraseña</Text>
          <View style={styles.action}>
            <Feather 
              name="lock"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#666666"
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={[styles.textInput, {
                color: colors.text
              }]}
              autoCapitalize="none"
              value={password}
            />
          </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => signIn(email, password)}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, {
                color:'#fff'
            }]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Registro')}
            style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
                color: '#009387'
            }]}>Registrase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login

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
      flex: 3,
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
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
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
  }
});