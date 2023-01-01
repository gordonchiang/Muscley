import { useCallback, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import type { EditDateScreenProps } from '../navigation/types';
import { useAppDispatch } from '../redux/hooks';
import { saveDataForSelectedDate } from '../redux/selectedDateSlice';
import { ExerciseSetsInput }from '../components/ExerciseSetsInput';
import type { IndexedSet } from '../components/SetInput';
import { ExerciseItem } from './types';

export const EditDateScreen = (props: EditDateScreenProps) => {
  const { navigation, route: { params: { dateString } } } = props;

  const [ sets, changeSets ] = useState<IndexedSet[]>([ {} ]);
  const [ exerciseName, setExerciseName ] = useState('');

  const dispatch = useAppDispatch();

  const handleSetsInput = useCallback(({ index, weight, reps }: IndexedSet) => {
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

  const handleExerciseNameInput = (name: string) => {
    setExerciseName(name);
  };

  return (
    <View>
      <Text>Edit Date Screen</Text>
      <ExerciseSetsInput
        index={ sets.length-1 }
        handleSetsInput={ handleSetsInput }
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
            date: dateString,
            title: exerciseName,
            data: { sets },
          };

          try {
            await dispatch(saveDataForSelectedDate({ date: dateString, data }));
          } catch(e) {
            // eslint-disable-next-line no-console
            console.log('Error in EditDateScreen', e);
          }

          navigation.goBack();
        } }
      />
    </View>
  );
};
