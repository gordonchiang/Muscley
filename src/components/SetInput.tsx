import { ReactElement, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { IndexedSet, SetDigitInput } from './SetDigitInput';

interface SetInputProps {
  index: number;
  handleSetsInput: (arg0: IndexedSet) => void;
  handleExerciseNameInput: (arg0: string) => void;
}

export const SetInput = (props: SetInputProps) => {
  const { index, handleSetsInput, handleExerciseNameInput } = props;

  const [ displaySets, changeDisplaySets ] = useState<ReactElement[]>([]);

  useEffect(() => {
    changeDisplaySets(displaySets => displaySets.concat(
      <SetDigitInput
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
      {
        displaySets
      }
    </View>
  );
};
