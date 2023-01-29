import { memo } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import type { Entry } from '../screens/EditEntryScreen';

const isEmptyItem = (item: Entry | Record<string, never>): item is Record<string, never> => Object.keys(item).length === 0;

interface AgendaListItemProps {
  item: Entry | Record<string, never>;
  dateString: string;
}

export const AgendaListItem = memo(
  function AgendaListItem(props: AgendaListItemProps) {
    const { item, dateString } = props;

    const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();

    if (isEmptyItem(item)) {
      return (
        <View>
          <Text>No entries for this date</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>{ item.title || 'Untitled' }</Text>
        <Button
          title='View Entry'
          onPress={ () => navigation.navigate('EditEntry', { dateString, entry: item }) }
        />
      </View>
    );
  }
);
