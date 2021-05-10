import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'

function SellerRegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    console.log(name, age, password, terms, selectedLanguage)
  }

  return (
    <View>
      <TextInput
        placeholder="Ingresa tu nombre"
        onChangeText={text => setName(text)}
        value={name}
      />
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
        title="Crear usuario"
        onPress={handleSubmit}
      />
    </View>
  )
}

export default SellerRegisterForm
