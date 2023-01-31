import { ReactElement } from 'react';
import { View } from 'react-native';
import { Set, SetInput } from './SetInput';

interface ExerciseSetsProps {
  sets: Set[];
  handleSetsInput: (arg0: Set, arg1: number) => void;
}

export const ExerciseSetsInput = (props: ExerciseSetsProps) => {
  const { sets, handleSetsInput } = props;

  const displaySets: ReactElement[] = sets.map((set, index) => {
    return (
      <SetInput
        key={ index }
        handleSetInput={ (set: Set) => handleSetsInput(set, index) }
        weightPlaceholder={ set.weight }
        repsPlaceholder={ set.reps }
      />
    );
  });

  return (
    <View>
      { displaySets }
    </View>
  );
};
