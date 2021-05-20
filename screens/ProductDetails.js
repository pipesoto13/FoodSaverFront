import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

export default function ProductDetails({navigation}) {
  const route = useRoute()

  const [product, setProduct] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log(route)

/*   useEffect(() => {
    setLoading(true)
    axios({
      method: 'GET',
      baseURL: 'https://jsonplaceholder.typicode.com',
      url: `/posts/${route.params.id}`
    })
      .then(({ data }) => setPost(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, []) */

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Something went wrong</Text>
  return (
    <View style={styles.text}>
      {/* <Text>{!!post && post.title}</Text>
      <Text>{!!post && post.body}</Text> */}
      <Text>Producto</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})