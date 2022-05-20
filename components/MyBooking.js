import { StatusBar } from 'expo-status-bar';
import { collection, where, query, doc, deleteDoc, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { StyleSheet, Text, View,Alert,Button } from 'react-native';
import { db } from '../firebase';
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

//Home component
export default function MyBooking() {
  const [userBases, setUserAppointments] = useState([]);
  const { user ,admin} = useUserAuth();



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

    const appointmentsCollectionRef = collection(db, "appointments");


    const getAppointments = async (queryThing) => {
      
      onSnapshot(queryThing, (querySnapshot) => {
      let userAppointments = [];
      querySnapshot.forEach((doc) => {
        userAppointments.push({...doc.data(),id: doc.id});
      });
      setUserAppointments(userAppointments);
      });
    };
    if(user){
    if(admin){
      var queryThing = query(appointmentsCollectionRef,where("status","==","accepted"));
    }else{
      var queryThing = query(appointmentsCollectionRef,where("uid","==",user.uid),orderBy("date","asc"));
    }
      getAppointments(queryThing);
    }else{
      setUserAppointments([])
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
          {
          item.rejectionReason
          ? <Text>{item.rejectionReason}</Text>
          : null
          }
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
