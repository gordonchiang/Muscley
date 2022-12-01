/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import AgendaListItem from '../components/AgendaListItem';
import { dateToDateString } from '../utils/dateFunctions';

const ITEMS: Record<string, any> = {
  '2022-12-01': {
    title: '2022-12-01',
    data: [ {
      title: 'placeholder',
    } ],
  },
};

const SELECTED_DATE_MARKING_PROPS = {
  selected: true,
  selectedColor: '#00BBF2',
  selectedTextColor: '#FFFFFF',
};

const getItems = (dateString: string) => {
  return ITEMS[dateString];
};

const Calendar = () => {
  const today = new Date();
  const todayDateString = dateToDateString(today);

  const [ items, selectItems ] = useState([ getItems(todayDateString) || {
    title: todayDateString,
    data: [ {} ],
  } ] );
  const [ markedDates, changeMarkedDates ] = useState({ [todayDateString]: SELECTED_DATE_MARKING_PROPS });

  const onDayPress = useCallback(({ dateString }: { dateString: string }) => {
    const newItems = [ getItems(dateString) || {
      title: dateString,
      data: [ {} ],
    } ];

    selectItems(newItems);
    changeMarkedDates({ [dateString]: SELECTED_DATE_MARKING_PROPS });
  }, []);

  const onDateChanged = useCallback((dateString: string, updateSource: string) => {
    if (updateSource !== 'todayPress') return;

    const newItems = [ getItems(dateString) || {
      title: dateString,
      data: [ {} ],
    } ];

    selectItems(newItems);
    changeMarkedDates({ [dateString]: SELECTED_DATE_MARKING_PROPS });
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaListItem item={ item } />;
  }, []);

  return (
    <View style={ { flex: 1 } }>
      <CalendarProvider
        date={ todayDateString }
        onDateChanged={ onDateChanged }
        showTodayButton= { true }
      >
        <ExpandableCalendar
          onDayPress={ onDayPress }
          theme={ {
            // Disable automatic selected date marking to avoid issue https://github.com/wix/react-native-calendars/issues/1537
            selectedDayBackgroundColor: '#ffffff',
            selectedDayTextColor: '#000000',
          } }
          markedDates={ markedDates }
        />
        <AgendaList
          sections={ items }
          renderItem={ renderItem }
        />
      </CalendarProvider>
    </View>
  );
};

export default Calendar;
