import { StatusBar } from 'expo-status-bar';
import { collection, where, query, doc, deleteDoc, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { StyleSheet, Text, View,TouchableOpacity,Button,Alert } from 'react-native';
import { db } from '../firebase';
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

//Home component
export default function MyBooking() {
  const [userBases, setUserAppointments] = useState([]);
  const { user } = useUserAuth();



  const deleteHandler = (id) => {
    Alert.alert(
      "Delete Appointment",
      "Are you sure you want to delete this appointment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteDoc(doc(db, "appointments", id)) }
      ]
    );
    
  };
  useEffect(() => {

    const getAppointments = async () => {
      const appointmentsCollectionRef = collection(db, "appointments");
      const q = query(appointmentsCollectionRef,where("status","==","pending"));
      
      onSnapshot(q, (querySnapshot) => {
      let userAppointments = [];
      querySnapshot.forEach((doc) => {
        userAppointments.push({...doc.data(),id: doc.id});
      });
      setUserAppointments(userAppointments);
      });
    };
    if(user){
      getAppointments();
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Text>Bookings!</Text>
      {userBases.map((item, index) => {
        return (<View key={index} style={styles.list}>
          <Text>{item.date}</Text>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{item.phone}</Text>
          <Text>{item.status}</Text>
          <Button title='X' color={"red"} onPress={()=>{deleteHandler(item.id)}}></Button>
          </View>
        )
      })
    }
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
  list: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    width: '90%',
  }
});
