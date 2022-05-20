import { StatusBar } from 'expo-status-bar';
import { collection, where, query, doc, deleteDoc, getDocs, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { StyleSheet, Text, View,TextInput,Button,Modal,Pressable } from 'react-native';
import { db } from '../firebase';
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

//Home component
export default function MyBooking() {
  const [userBases, setUserAppointments] = useState([]);
  const [id, setID] = useState();
  const { user } = useUserAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const acceptHandler = (itemID) => {
    updateDoc(doc(db, "appointments", itemID), {status: "accepted"});
  }
  const rejectHandler = () => {
    updateDoc(doc(db, "appointments", id), {status: "rejected", rejectionReason: rejectionReason});
    setModalVisible(false);

    
  };
  const modal = (id) => {
    setID(id);
    setModalVisible(true);
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
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Rejection Reason</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder='Rejection Reason'
                value={rejectionReason}
                defaultValue={rejectionReason}
                onChangeText={text =>setRejectionReason(text)}
                style={styles.input} 
                numberOfLines = {3}
              />

                
            </View>
            <Pressable
              style={[styles.button, styles.buttonAdd]}
              onPress={() => rejectHandler(id)}
            >
              <Text style={styles.textStyle}>Reject Booking!</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text>Bookings!</Text>
      {userBases.map((item, index) => {
        return (<View key={index} style={styles.list}>
          <Text>{item.date}</Text>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{item.phone}</Text>
          <Text>{item.status}</Text>
          <View style={styles.buttonsContainer}>
          <Button title='X Reject' color={"red"} style={styles.button} onPress={()=>{modal(item.id)}}></Button>
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
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonAdd: {
    backgroundColor: "#02ff99",
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
  },
  buttonClose: {
    backgroundColor: "#ff3663",
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
  },  
  inputContainer:{
    width: '80%',
  },
input:{
  backgroundColor: '#eee',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 10,
},
});
