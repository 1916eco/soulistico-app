import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TextInput, View, Button, TouchableOpacity, Switch } from 'react-native';
import {useUserAuth} from "../context/UserAuthContext";

//Home component
export default function Login_Register() {
  const [IsLogIn, setIsLogin] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const {user, signUp,logIn,logOut,updateUserProfile} = useUserAuth();

  const navigation = useNavigation();
  useEffect(() => {
    if (user) {
      navigation.navigate("Book");
    }
  }, [user])
  useEffect(() => {
    if (error) {
      alert(error);
    }
  },[error])
  
  const handleSignUp = async () => {
    try {
      await signUp(email,password)
      .then(()=>{
      updateUserProfile(name)
      if(user){
        navigation.navigate("Book");
      }
      })
    } catch (error) {
      setError(error.message);
    }

  }
  const handleLogin = async () => {
    try {
      await logIn(email, password)
      if(user){
        navigation.navigate("Book");
      }
    } catch (error) {
      setError(error.message);
    }

  }
  const handleLogOut = () => {
    logOut()
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
        sty
          onPress={() => setIsLogin(!IsLogIn)}
        >
    <Text
    style={styles.buttonRed}>
          Would you like to {!IsLogIn ? 'Register?' : 'Login?'}
          </Text>
        </TouchableOpacity>
      
      <View style={styles.inputContainer}>
      <TextInput 
      placeholder='Email'
      value={email}
      onChangeText={text =>setEmail(text)}
      style={styles.input} />
{
IsLogIn
?       <TextInput 
      placeholder='Name'
      value={name}
      onChangeText={text =>setName(text)}
      style={styles.input} />
: null
}
      <TextInput 
      placeholder='password'
      value={password}
      onChangeText={text =>setPassword(text)}
      style={styles.input} 
      secureTextEntry/>
        
      </View>
      <View style={styles.buttonContainer}>
{
!IsLogIn
?       <TouchableOpacity title="Login" style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
: null
}

{
IsLogIn
?       <TouchableOpacity title="Register" style={styles.buttonGreen} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
: null
}
{
user
?       <TouchableOpacity title="Register" style={styles.buttonGreen} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
: null
}
      </View>
      </KeyboardAvoidingView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#02bdc9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonRed: {
    backgroundColor: '#dd5555',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonGreen: {
    backgroundColor: '#02ff99',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  inputContainer:{
    width: '80%',
  },
input:{
  backgroundColor: '#eee',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 10,
},
buttonContainer:{
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,

},
buttonText:{
  alignSelf: 'center',
  color: '#fff',
  fontWeight: "700",
  fontSize: 16,

},
title:{
  fontSize: 20,
},

});
