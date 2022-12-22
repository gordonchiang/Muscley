import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import type { CalendarScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AgendaListItem from '../components/AgendaListItem';
import { fetchDataForSelectedDate } from '../redux/selectedDateSlice';

const SELECTED_DATE_MARKING_PROPS = {
  selected: true,
  selectedColor: '#00BBF2',
  selectedTextColor: '#FFFFFF',
};

const CalendarScreen = (props: CalendarScreenProps) => {
  const { dateString: initialDateString } = props.route.params;

  const [ selectedDateString, selectDateString ] = useState(initialDateString);
  const [ markedDates, changeMarkedDates ] = useState({ [initialDateString]: SELECTED_DATE_MARKING_PROPS });
  const items = useAppSelector((state) => {
    const { date, data } = state.selectedDate;

    return [ {
      title: date,
      data: [ data ? { title: data } : {} ],
    } ];
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getItems = async () => {
      await dispatch(fetchDataForSelectedDate(selectedDateString));
    };

    getItems();
  }, [ dispatch, selectedDateString ]);

  const onDayPress = useCallback(({ dateString }: { dateString: string }) => {
    selectDateString(dateString);
    changeMarkedDates({ [dateString]: SELECTED_DATE_MARKING_PROPS });    
  }, []);

  const onDateChanged = useCallback((dateString: string, updateSource: string) => {
    if (updateSource !== 'todayPress') return;
    
    selectDateString(dateString);
    changeMarkedDates({ [dateString]: SELECTED_DATE_MARKING_PROPS });    
  }, []);

  const renderItem = useCallback((props: any) => {
    const { item, section: { title: dateString } } = props;
    return <AgendaListItem item={ item } dateString={ dateString } />;
  }, []);

  return (
    <View style={ { flex: 1 } }>
      <CalendarProvider
        date={ initialDateString }
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

export default CalendarScreen;
