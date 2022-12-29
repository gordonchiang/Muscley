import { Text, View } from 'react-native';
import type { ViewExerciseScreenProps } from '../navigation/types';

const isEmpty = (obj: any) => [ Object, Array ].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const ViewExerciseScreen = (props: ViewExerciseScreenProps) => {
  const { exerciseItem } = props.route.params;

  return (
    <View>
      {
        isEmpty(exerciseItem)
          ? <Text>Empty date</Text>
          : <Text>Placeholder for not empty item { '\n' }{ exerciseItem.title as string }</Text>
      }
    </View>
  );
};
