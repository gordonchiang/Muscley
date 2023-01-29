import { memo } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import type { Entry } from '../screens/EditEntryScreen';

const isEmptyEntry= (entry: Entry | Record<string, never>): entry is Record<string, never> => Object.keys(entry).length === 0;

interface AgendaListItemProps {
  index: number;
  item: Entry | Record<string, never>;
  dateString: string;
}

export const AgendaListItem = memo(
  function AgendaListItem(props: AgendaListItemProps) {
    const { index, item: entry, dateString } = props;

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
          onPress={ () => navigation.navigate('EditEntry', { dateString, existingEntry: { entry, index } }) }
        />
      </View>
    );
  }
);
