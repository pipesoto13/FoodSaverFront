import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../components/context'


const Profile = () => {

  const { signOut } = useContext(AuthContext)
  
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
        <Button
          title="Salir"
          onPress={() => signOut()}
        />
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
});
