import { StatusBar } from 'expo-status-bar';
import { collection, where, query, doc, deleteDoc, getDocs, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { StyleSheet, Text, View,TouchableOpacity,Button,Alert } from 'react-native';
import { db } from '../firebase';
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

//Home component
export default function MyBooking() {
  const [userBases, setUserAppointments] = useState([]);
  const { user } = useUserAuth();


  const acceptHandler = (id) => {
    updateDoc(doc(db, "appointments", id), {status: "accepted"});
  }
  const rejectHandler = (id) => {
    updateDoc(doc(db, "appointments", id), {status: "rejected"});
    
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
          <View style={styles.buttonsContainer}>
          <Button title='X Reject' color={"red"} style={styles.button} onPress={()=>{rejectHandler(item.id)}}></Button>
          <Button title='✓ Accept' color={"green"} style={styles.button} onPress={()=>{acceptHandler(item.id)}}></Button>
          </View>
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
  },
  buttonsContainer:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  },
  button:{
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
  }
});
