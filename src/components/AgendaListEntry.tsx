import { memo } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import type { Entry } from '../screens/AddOrEditEntryScreen';

const isEmptyEntry = (entry: Entry | Record<string, never>): entry is Record<string, never> => Object.keys(entry).length === 0;

interface AgendaListEntryProps {
  index: number;
  entry: Entry | Record<string, never>;
  date: string;
}

export const AgendaListEntry = memo(
  function AgendaListItem(props: AgendaListEntryProps) {
    const { index, entry, date } = props;

    const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();

    if (isEmptyEntry(entry)) {
      return (
        <View>
          <Text>No entries for this date</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>{ entry.title || 'Untitled' }</Text>
        <Button
          title='View Entry'
          onPress={ () => navigation.navigate('AddOrEditEntry', { date, existingEntry: { entry, index } }) }
        />
      </View>
    );
  }
);
