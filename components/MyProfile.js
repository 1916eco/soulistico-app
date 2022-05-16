import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
//Home component
export default function MyProfile() {
    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);
  return (
    <View style={styles.container}>
        <Text>{count}</Text>
        <Button
          title="Left button"
          onPress={() => onPress()}
        />
        <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    paddingHorizontal:10,
    backgroundColor: '#006aff',
    borderRadius: 5,
    paddingVertical:5,
    marginTop:10,
  },
  ButtonText: {
    fontSize: 18,
    color: '#fff'
  },
});
