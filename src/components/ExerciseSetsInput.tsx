import { View } from 'react-native';
import { Set, SetInput } from './SetInput';

interface ExerciseSetsProps {
  sets: Set[];
  handleSetsInput: (arg0: Set, arg1: number) => void;
  plannedSets?: Set[];
}

export const ExerciseSetsInput = (props: ExerciseSetsProps) => {
  const { sets, handleSetsInput, plannedSets } = props;

  return (
    <View>
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
    </View>
  );
};
