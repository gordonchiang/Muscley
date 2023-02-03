import { StyleSheet, Text, View } from 'react-native';
import { DigitInput } from './DigitInput';

export type Set = {
  weight?: string;
  reps?: string;
};

interface SetInputProps {
  handleSetInput: (arg0: Set) => void;
  initialValues?: Set;
  placeholders?: Set;
}

export const SetInput = (props: SetInputProps) => {
  const { handleSetInput, initialValues, placeholders } = props;

  return (
    <View style={ styles.container }>
      <Text>Weight: </Text>
      <DigitInput
        handleDigitInput={ weight => handleSetInput({ weight }) }
        initialValue={ initialValues?.weight }
        placeholder={ placeholders?.weight }
      />
      <Text> Rep: </Text>
      <DigitInput
        handleDigitInput={ reps => handleSetInput({ reps }) }
        initialValue={ initialValues?.reps }
        placeholder={ placeholders?.reps }
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
