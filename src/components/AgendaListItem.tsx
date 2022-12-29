import { memo } from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';
import type { ExerciseItem } from '../screens/types';

const isEmptyItem = (item: ExerciseItem | Record<string, never>): item is Record<string, never> => {
  return Object.keys(item).length === 0;
};

interface AgendaListItemProps {
  item: ExerciseItem | Record<string, never>;
  dateString: string;
}

export const AgendaListItem = memo(
  function AgendaListItem(props: AgendaListItemProps) {
    const { item, dateString } = props;

    const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();

    return (
      <View>
        {
          !isEmptyItem(item)
            ? (
              <View>
                <Text>{ item.title ? item.title : 'Untitled' }</Text>
                <Button
                  title='View Exercise'
                  onPress={ () => navigation.navigate('ViewExercise', { exerciseItem: item }) }
                />
              </View>
            ) : null
        }
        <Button
          title='Edit Date'
          onPress={ () => navigation.navigate('EditDate', { dateString }) }
        />
      </View>
    );
  }
);
