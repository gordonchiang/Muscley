import { StyleSheet, Text, View } from 'react-native';
import DigitInput from './DigitInput';

type SetDigit = {
  index?: number;
  weight?: string;
  reps?: string;
};

interface SetDigitInputProps {
  index?: number;
  handleSetDigitInput: (arg0: SetDigit) => void;
  weightPlaceholder?: string;
  repsPlaceholder?: string;
}

const SetDigitInput = (props: SetDigitInputProps) => {
  const {
    index,
    handleSetDigitInput,
    weightPlaceholder,
    repsPlaceholder,
  } = props;

  return (
    <View style={ styles.container }>
      <Text>Weight: </Text>
      <DigitInput
        handleDigitInput={ (weight) => {
          handleSetDigitInput({ index, weight });
        } }
        placeholder={ weightPlaceholder }
      />
      <Text> Rep: </Text>
      <DigitInput
        handleDigitInput={ (reps) => {
          handleSetDigitInput({ index, reps });
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
