import { Button, TextInput, View } from 'react-native';
import { ExerciseSetsInput }from '../components/ExerciseSetsInput';
import type { Set } from '../components/SetInput';
import type { ExerciseItem } from '../screens/types';

interface ExerciseInputProps {
  date: string;
  exerciseItem?: ExerciseItem;
  handleExerciseInput: (arg0: ExerciseItem, index?: number) => void;
  index: number;
  plannedSets?: Set[];
}

export const ExerciseInput = (props: ExerciseInputProps) => {
  const {
    date,
    exerciseItem: { data, title } = { data: null, title: '' },
    handleExerciseInput,
    index,
    plannedSets,
  } = props;

  const sets: Set[] = data as Set[] ?? [ {} ];

  const handleSetsInput = ({ weight, reps }: Set, i: number) => {
    const newExerciseItem: ExerciseItem = {
      date,
      title,
      data: sets.map((set, j) => {
        return i !== j
          ? set
          : {
            ...set,
            ...(weight && { weight }),
            ...(reps && { reps }),
          };
      }),
    };
    
    handleExerciseInput(newExerciseItem, index);
  };

  const handleExerciseNameInput = (newExerciseName: string) => {
    const newExerciseItem: ExerciseItem = {
      date,
      title: newExerciseName,
      data: sets,
    };
    
    handleExerciseInput(newExerciseItem, index);
  };

  return (
    <View>
      <TextInput
        onChangeText={ handleExerciseNameInput }
        style={ { borderWidth: 1 } }
        value={ title }
      />
      <ExerciseSetsInput
        sets={ sets }
        handleSetsInput={ handleSetsInput }
        plannedSets={ plannedSets }
      />
      <Button
        title='Add Another Set'
        onPress={ () => {
          const newExerciseItem: ExerciseItem = {
            date,
            title,
            data: sets.concat({}),
          };

          handleExerciseInput(newExerciseItem, index);
        } }
      />
    </View>
  );
};
