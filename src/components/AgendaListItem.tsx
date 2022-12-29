import { memo } from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import { ExerciseItem } from '../screens/types';

interface AgendaListItemProps {
  item: ExerciseItem;
  dateString: string;
}

export const AgendaListItem = memo(
  function AgendaListItem(props: AgendaListItemProps) {
    const { item, dateString } = props;

    const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();

    return (
      <View>
        {
          item.title
            ? <Text>{ item.title as string }</Text>
            : null
        }
        <Button
          title='View Exercise'
          onPress={ () => navigation.navigate('ViewExercise', { exerciseItem: item }) }
        />
        <Button
          title='Edit Date'
          onPress={ () => navigation.navigate('EditDate', { dateString }) }
        />
      </View>
    );
  }
);
