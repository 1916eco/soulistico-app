import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {useUserAuth} from "../context/UserAuthContext";

//Home component
export default function BookNew() {
  const {user} = useUserAuth();

const disabled_color = '#e68f8d';
const  state = {
    markedDates: {
      "2022-05-16": { color: disabled_color },
      "2022-05-17": { color: disabled_color },
      "2022-05-19": { color: disabled_color, disableTouchEvent: true },
      "2022-05-20": { color: disabled_color },
      
    },
    isStartDatePicked: false,
    isEndDatePicked: false,
    startDate: ''
}

  return (
    
    <View style={styles.container}>
{
!user
?       <Text>Login to add new Bookings!</Text>

: null
}      
<Calendar
          style={styles.calendar}
          minDate={Date()}
          maxDate={'2023-01-31'}
          monthFormat={"MMMM yyyy"}
          markedDates={state.markedDates}
          markingType="period"
          hideExtraDays={true}
          hideDayNames={true}
          enableSwipeMonths={true}
          onDayPress={day => {
            alert(day.dateString);
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
  }
});
