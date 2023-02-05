import { useCallback, useEffect, useState } from 'react';
import { Button, SectionListRenderItemInfo, View } from 'react-native';
import { AgendaList, CalendarProvider, DateData, ExpandableCalendar } from 'react-native-calendars';
import type { CalendarScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchDataForSelectedDate } from '../redux/selectedDateSlice';
import { AgendaListEntry } from '../components/AgendaListEntry';
import type { Entry } from './AddOrEditEntryScreen';
import { AgendaListItems, selectedDateStateToAgendaListItem } from '../api/calendar';
import { dateObjectToString } from '../utils/dateFunctions';

const SELECTED_DATE_MARKING_PROPS = {
  selected: true,
  selectedColor: '#00BBF2',
  selectedTextColor: '#FFFFFF',
};

export const CalendarScreen = (props: CalendarScreenProps) => {
  const { navigation, route: { params: { date } = {} } } = props;
  const initialDate: string = date ?? dateObjectToString(new Date());

  const [ selectedDate, selectDate ] = useState<string>(initialDate);
  const [ markedDates, changeMarkedDates ] = useState<Record<string, typeof SELECTED_DATE_MARKING_PROPS>>({ [initialDate]: SELECTED_DATE_MARKING_PROPS });
  const items: AgendaListItems<Entry[]> = useAppSelector(({ selectedDate }) => selectedDateStateToAgendaListItem<Entry[]>(selectedDate));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getItems = async () => {
      await dispatch(fetchDataForSelectedDate(selectedDate));
    };

    getItems();
  }, [ dispatch, selectedDate ]);

  const onDayPress = useCallback(({ dateString: date }: DateData) => {
    selectDate(date);
    changeMarkedDates({ [date]: SELECTED_DATE_MARKING_PROPS });    
  }, []);

  const onDateChanged = useCallback((date: string, updateSource: string) => {
    if (updateSource !== 'todayPress') return;
    
    selectDate(date);
    changeMarkedDates({ [date]: SELECTED_DATE_MARKING_PROPS });    
  }, []);

  const renderItem = useCallback((itemInfo: SectionListRenderItemInfo<Entry | Record<string, never>>) => {
    const { index, item, section: { title: date } } = itemInfo;

    // AgendaList currently forces the section type to be DefaultSectionT
    if (typeof date !== 'string') throw new TypeError('`title` passed to `section` in `renderItem` of `AgendaList` is not of type `string`');

    return <AgendaListEntry index={ index } entry={ item } date={ date } />;
  }, []);

  return (
    <View style={ { flex: 1 } }>
      <CalendarProvider
        date={ initialDate }
        onDateChanged={ onDateChanged }
        showTodayButton= { true }
      >
        <ExpandableCalendar
          onDayPress={ onDayPress }
          theme={ {
            // Disable automatic selected date marking to avoid issue https://github.com/wix/react-native-calendars/issues/1537
            selectedDayBackgroundColor: '#FFFFFF',
            selectedDayTextColor: '#000000',
          } }
          markedDates={ markedDates }
        />
        <AgendaList
          sections={ items }
          renderItem={ renderItem }
        />
        <Button
          title='Add New Entry'
          onPress={ () => navigation.navigate('AddOrEditEntry', { date: selectedDate }) }
        />
      </CalendarProvider>
    </View>
  );
};
