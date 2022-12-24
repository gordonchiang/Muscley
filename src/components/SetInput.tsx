import { ReactElement, useEffect, useState } from 'react';
import { View } from 'react-native';
import SetDigitInput, { SetDigit } from './SetDigitInput';

interface SetInputProps {
  index: number;
  handleSetsInput: (arg0: SetDigit) => void;
}

const SetInput = (props: SetInputProps) => {
  const { index, handleSetsInput } = props;

  const [ displaySets, changeDisplaySets ] = useState<ReactElement[]>([]);

  useEffect(() => {
    changeDisplaySets(displaySets => displaySets.concat(
      <SetDigitInput
        key={ index }
        index={ index }
        handleSetDigitInput={ handleSetsInput }
      />
    ));
  }, [ index, handleSetsInput ]);

  return (
    <View>
      {
        displaySets
      }
    </View>
  );
};

export default SetInput;
