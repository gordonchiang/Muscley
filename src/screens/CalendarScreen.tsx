import { useCallback, useEffect, useState } from 'react';
import { SectionListRenderItemInfo, View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import type { CalendarScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchDataForSelectedDate } from '../redux/selectedDateSlice';
import { AgendaListItem } from '../components/AgendaListItem';
import type { ExerciseItem } from './types';
import { AgendaListItems, selectedDateStateToAgendaListItem } from '../api/calendar';

const SELECTED_DATE_MARKING_PROPS = {
  selected: true,
  selectedColor: '#00BBF2',
  selectedTextColor: '#FFFFFF',
};

export const CalendarScreen = (props: CalendarScreenProps) => {
  const { dateString: initialDateString } = props.route.params;

  const [ selectedDateString, selectDateString ] = useState(initialDateString);
  const [ markedDates, changeMarkedDates ] = useState({ [initialDateString]: SELECTED_DATE_MARKING_PROPS });
  const items: AgendaListItems = useAppSelector(({ selectedDate }) => selectedDateStateToAgendaListItem(selectedDate));
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

  const renderItem = useCallback((itemInfo: SectionListRenderItemInfo<ExerciseItem | Record<string, never>>) => {
    const { item, section: { title: dateString } } = itemInfo;

    // AgendaList currently forces the section type to be DefaultSectionT
    if (typeof dateString !== 'string') throw new TypeError('`title` passed to `section` in `renderItem` of `AgendaList` is not of type `string`');

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
            selectedDayBackgroundColor: '#FFFFFF',
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
