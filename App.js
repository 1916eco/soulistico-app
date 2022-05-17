
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import { useState } from 'react';
import {UserAuthContextProvider} from "./context/UserAuthContext";

//Home component

export default function App() {

  return (
    <UserAuthContextProvider>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </UserAuthContextProvider>

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
