import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Modal,Pressable,TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {useUserAuth} from "../context/UserAuthContext";
import { db } from '../firebase';
import { collection, where, query, onSnapshot,addDoc } from "firebase/firestore";

//Home component
export default function BookNew() {
  const disabled_color = '#e68f8d';
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const [todayDate, setTodayDate] = useState('');
  const [state, setState] = useState({});
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const {user} = useUserAuth();
  const appointmentsCollectionRef = collection(db, "appointments");
  const [userBases, setUserAppointments] = useState([]);
  
  useEffect(() => {
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
  setTodayDate(formatDate(new Date()));

    if(user){
      setName(user.displayName);
    }
  }, [])
  useEffect(() => {

    const getAppointmentsCalendar = async () => {
      const appointmentsCollectionRef = collection(db, "appointments");
      var q = query(appointmentsCollectionRef,where("status","!=","rejected"));
      //var q = query(appointmentsCollectionRef,where("date",">",todayDate));
      
      onSnapshot(q, (querySnapshot) => {
      let calendarState = {};
      querySnapshot.forEach((doc) => {
        if(doc.data().date>todayDate){
        calendarState[doc.data().date] = {color: disabled_color, disableTouchEvent: true }
        }
      });
      setState(calendarState);
      console.log(calendarState);
      });
    };

    if(!user){
      getAppointmentsCalendar();
    }
  }, [user]);
  
const  states = {
  markedDates: {
    "2022-05-26": { color: disabled_color, disableTouchEvent: true },    
    "2022-05-27": { color: disabled_color, disableTouchEvent: true },    
  },
  isStartDatePicked: false,
  isEndDatePicked: false,
  startDate: ''
}

const handleModal = () => {
  if(user){
  setModalVisible(true);
  }
  else{
    alert("Login to book an appointment");
  }
}
const handleAppointmentRequest = () => {
  if(selectedDay){
    addDoc(appointmentsCollectionRef, {
      uid:user.uid,
      name:name,
      description:description,
      phone:phone,
      date:selectedDay,
      status:'pending'
    }).then(()=>{
      setModalVisible(false);
    });
  }
}

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
            <Text style={styles.modalTitle}>{selectedDay}</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder='Name'
                value={name}
                defaultValue={name}
                onChangeText={text =>setName(text)}
                style={styles.input} />
            <TextInput 
              placeholder='Any additional information?'
              value={description}
              numberOfLines = {3}
              onChangeText={text =>setDescription(text)}
              style={styles.input} />
            <TextInput 
              placeholder='Phone Number'
              value={phone}
              keyboardType = 'phone-pad'
              onChangeText={text =>setPhone(text)}
              style={styles.input} />
            </View>
            <Pressable
              style={[styles.button, styles.buttonAdd]}
              onPress={() => handleAppointmentRequest()}
            >
              <Text style={styles.textStyle}>Request Booking!</Text>
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
{
!user
? <Text>Login to add new Bookings!</Text>

: <Text>Click on any open days to start Booking!</Text>
}      
<Calendar
          style={styles.calendar}
          minDate={Date()}
          maxDate={'2023-01-31'}
          monthFormat={"MMMM yyyy"}
          markedDates={state}
          markingType="period"
          hideExtraDays={true}
          hideDayNames={true}
          enableSwipeMonths={true}
          onDayPress={day => {
            setSelectedDay(day.dateString);
            handleModal();
       }}
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
  calendar: {
    width: 350,
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
    height: "95%",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonAdd: {
    backgroundColor: "#02ff99",
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#ff3663",
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
