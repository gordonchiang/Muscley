import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CalendarScreenProps } from '../navigation/types';
import AgendaListItem from '../components/AgendaListItem';

const SELECTED_DATE_MARKING_PROPS = {
  selected: true,
  selectedColor: '#00BBF2',
  selectedTextColor: '#FFFFFF',
};

const CalendarScreen = (props: CalendarScreenProps) => {
  const { dateString: initialDateString, dayItem } = props.route.params;

  const [ selectedDateString, selectDateString ] = useState(initialDateString);
  const [ items, selectItems ] = useState([ dayItem || {
    title: initialDateString,
    data: [ {} ],
  } ] );
  const [ markedDates, changeMarkedDates ] = useState({ [initialDateString]: SELECTED_DATE_MARKING_PROPS });

  useEffect(() => {
    const getItems = async () => {
      const emptyItem = {
        title: selectedDateString,
        data: [ {} ],
      };

      try {
        const jsonValue = await AsyncStorage.getItem(selectedDateString);
        selectItems([ jsonValue ? JSON.parse(jsonValue) : emptyItem ]);
      } catch(e) {
        console.log('Error getting saved items from CalendarScreen', e);
        selectItems([ emptyItem ]);
      }
    };

    getItems();
  }, [ selectedDateString, dayItem ]);

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
