import { Button, TextInput, View } from 'react-native';
import { Set, SetInput } from '../components/SetInput';

export type ExerciseItem = {
  title: string;
  sets?: Set[];
};

interface ExerciseInputProps {
  exerciseItem?: ExerciseItem;
  handleExerciseInput: (arg0: ExerciseItem) => void;
  plannedSets?: Set[];
}

export const ExerciseInput = (props: ExerciseInputProps) => {
  const { exerciseItem, handleExerciseInput, plannedSets } = props;
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
    
    handleExerciseInput(newExerciseItem);
  };

  const handleExerciseNameInput = (newExerciseName: string) => {
    const newExerciseItem: ExerciseItem = {
      title: newExerciseName,
      sets,
    };
    
    handleExerciseInput(newExerciseItem);
  };

  return (
    <View>
      <TextInput
        onChangeText={ handleExerciseNameInput }
        style={ { borderWidth: 1 } }
        value={ title }
      />
      {
        sets.map((set, index) => {
          return (
            <SetInput
              key={ index }
              handleSetInput={ (set: Set) => handleSetsInput(set, index) }
              initialValues={ { weight: set.weight, reps: set.reps } }
              placeholders={ { weight: plannedSets?.[index]?.weight, reps: plannedSets?.[index]?.reps } }
            />
          );
        })
      }
      <Button
        title='Add Another Set'
        onPress={ () => {
          const newExerciseItem: ExerciseItem = {
            title,
            sets: sets.concat({}),
          };

          handleExerciseInput(newExerciseItem);
        } }
      />
    </View>
  );
};
