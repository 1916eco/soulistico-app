import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View,Alert  } from 'react-native';
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
});
