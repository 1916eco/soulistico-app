import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import MyBooking from './components/MyBooking';
import myProfile from './components/MyProfile';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

//Home component

export default function App() {
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
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#02bdc9',
                tabBarInactiveTintColor: 'gray',
              })}>
        <Tab.Screen name="Book" component={HomeScreen} />
        <Tab.Screen name="My Bookings" component={MyBooking} />
        <Tab.Screen name="Profile" component={myProfile} />
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
