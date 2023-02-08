import { memo } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import type { Entry } from '../screens/AddOrEditEntryScreen';

const isEmptyItem = (item: object): item is Record<string, never> => Object.keys(item).length === 0;

interface AgendaListItemProps {
  index: number;
  item: Entry | Record<string, never>;
  date: string;
}

export const AgendaListItem = memo(
  function AgendaListItem(props: AgendaListItemProps) {
    const { index, item: entry, date } = props;

    const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();

    if (isEmptyItem(entry)) {
      return (
        <View>
          <Text>No entries for this date</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>{ entry.title }</Text>
        <Button
          title='View Entry'
          onPress={ () => navigation.navigate('AddOrEditEntry', { date, existingEntry: { entry, index } }) }
        />
      </View>
    );
  }
);
