import { StyleSheet, Text, View } from 'react-native';
import DigitInput from './DigitInput';

type SetDigit = {
  weight?: string;
  reps?: string;
};

interface SetDigitInputProps {
  handleSetDigitInput(input: SetDigit): void;
  weightPlaceholder?: string;
  repsPlaceholder?: string;
}

const SetDigitInput = (props: SetDigitInputProps) => {
  const { handleSetDigitInput, weightPlaceholder, repsPlaceholder } = props;

  return (
    <View style={ styles.container }>
      <Text>Weight: </Text>
      <DigitInput
        handleDigitInput={ (weight) => {
          handleSetDigitInput({ weight });
        } }
        placeholder={ weightPlaceholder }
      />
      <Text> Rep: </Text>
      <DigitInput
        handleDigitInput={ (reps) => {
          handleSetDigitInput({ reps });
        } }
        placeholder={ repsPlaceholder }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SetDigitInput;
export { SetDigit };
