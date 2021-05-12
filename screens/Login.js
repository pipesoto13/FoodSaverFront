import React, { useState, useContext } from 'react'
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native'
import { AuthContext } from '../components/context';

function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  const foundUser = [{userToken: 'agaghahyafhvaety', userName: 'Felipe'}]

  return (
    <View>
      <TextInput
        placeholder="Ingresa tu correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Ingresa tu contraseña"
        onChangeText={text => setPassword(text)}
        secureTextEntry
        value={password}
      />
      <Button
        title="Login"
        onPress={() => signIn(foundUser)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Registro')}
      >
        <Text>Registrase</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login
