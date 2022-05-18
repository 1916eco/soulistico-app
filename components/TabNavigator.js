import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import BookNew from './BookNew';
import MyBooking from './MyBooking';
import myProfile from './MyProfile';
import Login_Register from './Login_Register';
import Ionicons from '@expo/vector-icons/Ionicons';


const TabNavigator = () => {
const Tab = createBottomTabNavigator();
const {user,admin} = useUserAuth();

  return (
<Tab.Navigator screenOptions={({
    route
  }) => ({
    tabBarIcon: ({
      focused,
      color,
      size
    }) => {
      let iconName;

      if (route.name === 'Book') {
        iconName = focused ? 'calendar' : 'calendar-outline';
      } else if (route.name === 'My Bookings') {
        iconName = focused ? 'clipboard' : 'clipboard-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      } else if (route.name === 'Login/Register') {
        iconName = focused ? 'log-in' : 'log-in-outline';
      } else if (route.name === 'Admin') {
        iconName = focused ? 'shield' : 'shield-outline';
      }


      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#02bdc9',
    tabBarInactiveTintColor: 'gray'
  })}>
        <Tab.Screen name="Book" component={BookNew} />
        <Tab.Screen name="My Bookings" component={MyBooking} />
        {user ? <Tab.Screen name="Profile" component={myProfile} /> : <Tab.Screen name="Login/Register" component={Login_Register} />}
        {
        admin
        ? <Tab.Screen name="Admin" component={MyBooking} />
        : null
        }
        
      </Tab.Navigator>
  )
}

export default TabNavigator
