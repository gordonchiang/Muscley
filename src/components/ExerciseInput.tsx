import { Button, TextInput, View } from 'react-native';
import { ExerciseSetsInput }from '../components/ExerciseSetsInput';
import type { Set } from '../components/SetInput';

export type ExerciseItem = {
  title: string;
  sets?: Set[];
};

interface ExerciseInputProps {
  exerciseItem?: ExerciseItem;
  handleExerciseInput: (arg0: ExerciseItem, index?: number) => void;
  index: number;
  plannedSets?: Set[];
}

export const ExerciseInput = (props: ExerciseInputProps) => {
  const { exerciseItem, handleExerciseInput, index, plannedSets } = props;
  const title: string = exerciseItem?.title ?? '';
  const sets: Set[] = exerciseItem?.sets ?? [ {} ];

  const handleSetsInput = ({ weight, reps }: Set, i: number) => {
    const newExerciseItem: ExerciseItem = {
      title,
      sets: sets.map((set, j) => {
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
      title: newExerciseName,
      sets,
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
            title,
            sets: sets.concat({}),
          };

          handleExerciseInput(newExerciseItem, index);
        } }
      />
    </View>
  );
};
