import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { AuthContext } from '../components/context'


export default function Posts() {
  const navigation = useNavigation()
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'GET',
      baseURL: 'http://192.168.0.11:8000',
      url: '/products'
    })
      .then(({ data }) => {setPosts(data)})
      .catch((err) => {setError(true)})
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Algo salió mal</Text>
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.title}>{item.price}</Text>
            <Text style={styles.body}>{item.description}</Text>
            <Button
              title="View more"
              onPress={() => navigation.navigate('Post', { id: item.id })}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Salir"
        onPress={() => signOut()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  body: {
    fontSize: 16,
  }
})
