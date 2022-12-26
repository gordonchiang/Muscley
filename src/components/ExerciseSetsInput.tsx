import { ReactElement, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { IndexedSet, SetInput } from './SetInput';

interface ExerciseSetsProps {
  index: number;
  handleSetsInput: (arg0: IndexedSet) => void;
  handleExerciseNameInput: (arg0: string) => void;
}

export const ExerciseSetsInput = (props: ExerciseSetsProps) => {
  const { index, handleSetsInput, handleExerciseNameInput } = props;

  const [ displaySets, changeDisplaySets ] = useState<ReactElement[]>([]);

  useEffect(() => {
    changeDisplaySets(displaySets => displaySets.concat(
      <SetInput
        key={ index }
        index={ index }
        handleSetInput={ handleSetsInput }
      />
    ));
  }, [ index, handleSetsInput ]);

  return (
    <View>
      <TextInput
        onChangeText={ handleExerciseNameInput }
        style={ { borderWidth: 1 } }
      />
      { displaySets }
    </View>
  );
};
