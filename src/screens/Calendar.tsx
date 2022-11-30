/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import AgendaListItem from '../components/AgendaListItem';

const ITEMS: Record<string, any> = {
  '2022-12-01': {
    title: '2022-12-01',
    data: [ {
      title: 'placeholder',
    } ],
  },
};

const getItems = (dateString: string) => {
  return ITEMS[dateString];
};

const Calendar = () => {
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0];

  const [ items, selectItems ] = useState([ getItems(todayDateString) || {
    title: todayDateString,
    data: [ {} ],
  } ] );

  const onDateChanged = useCallback((date: string) => {
    const newItems = [ getItems(date) || {
      title: date,
      data: [ {} ],
    } ];

    selectItems(newItems);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaListItem item={ item } />;
  }, []);

  return (
    <View style={ { flex: 1 } }>
      <CalendarProvider
        date={ todayDateString }
        onDateChanged={ onDateChanged }
      >
        <ExpandableCalendar />
        <AgendaList
          sections={ items }
          renderItem={ renderItem }
        />
      </CalendarProvider>
    </View>
  );
};

export default Calendar;
