import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookNew from './components/BookNew';
import MyBooking from './components/MyBooking';
import myProfile from './components/MyProfile';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import Login_Register from './components/Login_Register';
//import { UserAuthContextProvider } from './context/UserAuthContext';
const Tab = createBottomTabNavigator();

//Home component

export default function App() {
  const [user, setUser] = useState(false)
  return (
    <NavigationContainer>
      <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Book') {
                    iconName = focused
                      ? 'calendar'
                      : 'calendar-outline';
                  } else if (route.name === 'My Bookings') {
                    iconName = focused ? 'clipboard' : 'clipboard-outline';
                  }else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                  }else if (route.name === 'Login/Register') {
                    iconName = focused ? 'log-in' : 'log-in-outline';
                  }
      
                  // You can return any component that you rlike here!
                  return <Ionicons name={iconName} size={size} color={color} />; 
                },
                tabBarActiveTintColor: '#02bdc9',
                tabBarInactiveTintColor: 'gray',
              })}>
        <Tab.Screen name="Book" component={BookNew} />
        <Tab.Screen name="My Bookings" component={MyBooking} />
        {
        user
        ? <Tab.Screen name="Profile" component={myProfile} />
        : <Tab.Screen name="Login/Register" component={Login_Register} />
        }
        
      </Tab.Navigator>
    </NavigationContainer>

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
