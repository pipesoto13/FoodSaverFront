import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons  } from '@expo/vector-icons';

const SplashScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#94618E' barStyle="light-content"/>
      <View style={styles.header}>
        <Animatable.Image 
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View 
        style={styles.footer}
        animation="fadeInUpBig"
      >
        <Text 
          style={styles.title}
        >
          Salva comida mientras ayudas al planeta!
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <LinearGradient
              colors={['#94618E', '#49274A']}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Comienza</Text>
              <MaterialIcons 
                name="navigate-next"
                color="#fefefe"
                size={25}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.40;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#94618E'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#F8EEE7',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
  }
});