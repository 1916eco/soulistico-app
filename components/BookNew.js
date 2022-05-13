import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar,CalendarProps } from 'react-native-calendars';
//Home component
export default function BookNew() {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};
const disabled_color = '#e68f8d';
  state = {
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
