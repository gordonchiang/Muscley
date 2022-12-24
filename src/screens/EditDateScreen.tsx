import { useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { EditDateScreenProps } from '../navigation/types';
import { useAppDispatch } from '../redux/hooks';
import { saveDataForSelectedDate } from '../redux/selectedDateSlice';
import SetInput from '../components/SetInput';
import type { SetDigit } from '../components/SetDigitInput';

const EditDateScreen = (props: EditDateScreenProps) => {
  const { navigation, route: { params: { dateString } } } = props;

  const [ sets, changeSets ] = useState<SetDigit[]>([ {} ]);
  const [ exerciseName, setExerciseName ] = useState('');

  const dispatch = useAppDispatch();

  const handleSetsInput = useCallback(({ index, weight, reps }: SetDigit) => {
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
      <Text>EditDate Screen</Text>
      <SetInput index={ sets.length-1 } handleSetsInput={ handleSetsInput } handleExerciseNameInput={ handleExerciseNameInput } />
      <Button
        title='Add Another Set'
        onPress={ () => {
          changeSets(sets.concat({}));
        } }
      />
      <Button
        title='Add Exercise'
        onPress={ async () => {
          try {
            const filledSets = sets.filter(set => set.weight || set.reps);
            if (filledSets.length > 0) await dispatch(saveDataForSelectedDate({
              date: dateString,
              data: { title: exerciseName, sets: filledSets },
            }));
          } catch(e) {
            console.log('Error in EditDateScreen', e);
          }
          navigation.goBack();
        } }
      />
    </View>
  );
};

export default EditDateScreen;
