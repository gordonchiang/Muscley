import { useCallback, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import type { EditDateScreenProps } from '../navigation/types';
import { ExerciseSetsInput }from '../components/ExerciseSetsInput';
import type { Set } from '../components/SetInput';
import type { ExerciseItem } from './types';

export const EditDateScreen = (props: EditDateScreenProps) => {
  const { navigation, route: { params: { date, exerciseItem } } } = props;

  const initialSets: Set[] = exerciseItem ? (exerciseItem.data as Record<'sets', Set[]>).sets : [ {} ];
  const initialExerciseName: string = exerciseItem?.title || '';

  const [ sets, changeSets ] = useState<Set[]>(initialSets);
  const [ exerciseName, setExerciseName ] = useState<string>(initialExerciseName);

  const handleSetsInput = useCallback(({ weight, reps }: Set, index: number) => {
    changeSets(sets => sets.map((set, i) => {
      return i !== index
        ? set
        : {
          ...set,
          ...(weight && { weight }),
          ...(reps && { reps }),
        };
    }));
  }, []);

  const handleExerciseNameInput = (name: string) => setExerciseName(name);

  return (
    <View>
      <Text>{ `Date: ${date}` }</Text>
      <ExerciseSetsInput
        sets={ sets }
        handleSetsInput={ handleSetsInput }
        exerciseName={ exerciseName }
        handleExerciseNameInput={ handleExerciseNameInput }
      />
      <Button
        title='Add Another Set'
        onPress={ () => {
          changeSets(sets.concat({}));
        } }
      />
      <Button
        title='Add Exercise'
        onPress={ async () => {
          if (exerciseName === '') {
            Alert.alert('Error', 'Please input an exercise name');
            return;
          }

          if (!sets.every(set => set.weight && set.reps)) {
            Alert.alert('Error', 'Please complete all sets');
            return;
          }

          const data: ExerciseItem = {
            date,
            title: exerciseName,
            data: { sets },
          };

          navigation.navigate({
            name: 'AddOrEditEntry',
            params: { date, exerciseItem: data },
            merge: true,
          });
        } }
      />
      <Button
        title='Go Back'
        onPress={ () => navigation.goBack() }
      />
    </View>
  );
};
