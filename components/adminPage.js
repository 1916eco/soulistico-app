import { StatusBar } from 'expo-status-bar';
import { collection, where, query, doc, deleteDoc, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { db } from '../firebase';
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

//Home component
export default function MyBooking() {
  const [userBases, setUserBases] = useState([]);
  const { user } = useUserAuth();



  // const deleteHandler = (id) => {
  //   deleteDoc(doc(db, "appointments", id));
  // };
  useEffect(() => {

    const getLocation = async () => {
      const appointmentsCollectionRef = collection(db, "appointments");
      const q = query(appointmentsCollectionRef,where("status","==","pending"));
      //const querySnapshot = await getDocs(q);
      
      onSnapshot(q, (querySnapshot) => {
      let userBases = [];
      querySnapshot.forEach((doc) => {
        userBases.push(doc.data());

      });
      console.log(userBases);
      setUserBases(userBases);
      });
    };
    if(user){
      getLocation();
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
          <Button title='X' color={"red"} ></Button>
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
