import { useCallback } from 'react';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import AgendaListItem from '../components/AgendaListItem';

const Calendar = () => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate()+1);
  const items = [
    {
      title: today.toISOString().split('T')[0],
      data: [ {} ],
    },
    {
      title: tomorrow.toISOString().split('T')[0],
      data: [ {
        title: 'placeholder',
      } ],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderItem = useCallback(({ item }: any) => {
    return <AgendaListItem item={ item } />;
  }, []);

  return (
    <View style={ { flex: 1 } }>
      <CalendarProvider date={ today.toISOString().split('T')[0] }>
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
