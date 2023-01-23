import { StyleSheet, Text, View } from 'react-native';
import { DigitInput } from './DigitInput';

export type Set = {
  weight?: string;
  reps?: string;
};

interface SetInputProps {
  handleSetInput: (arg0: Set) => void;
  weightPlaceholder?: string;
  repsPlaceholder?: string;
}

export const SetInput = (props: SetInputProps) => {
  const { handleSetInput, weightPlaceholder, repsPlaceholder } = props;

  return (
    <View style={ styles.container }>
      <Text>Weight: </Text>
      <DigitInput
        handleDigitInput={ weight => handleSetInput({ weight }) }
        placeholder={ weightPlaceholder }
      />
      <Text> Rep: </Text>
      <DigitInput
        handleDigitInput={ reps => handleSetInput({ reps }) }
        placeholder={ repsPlaceholder }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
