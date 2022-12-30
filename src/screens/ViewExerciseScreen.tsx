import { Button, Text, View } from 'react-native';
import type { ViewExerciseScreenProps } from '../navigation/types';

export const ViewExerciseScreen = (props: ViewExerciseScreenProps) => {
  const { navigation, route: { params: { exerciseItem } } } = props;
  const { title, date, data } = exerciseItem;

  const { sets } = data as Record<string, unknown>;

  return (
    <View>
      <Text>{ `Title: ${title || 'Untitled'}` }</Text>
      <Text>{ `Date: ${date}` }</Text>
      <Text>{ `Sets: ${JSON.stringify(sets)}` }</Text>
      <Button
        title='Go Back'
        onPress={ () => navigation.goBack() }
      />
    </View>
  );
};
