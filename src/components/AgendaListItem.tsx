import { memo } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import type { ExerciseItem } from '../screens/types';

const isEmptyItem = (item: ExerciseItem | Record<string, never>): item is Record<string, never> => Object.keys(item).length === 0;

interface AgendaListItemProps {
  item: ExerciseItem | Record<string, never>;
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
          title='View Exercise'
          onPress={ () => navigation.navigate('ViewExercise', { dateString, exerciseItem: item }) }
        />
      </View>
    );
  }
);
