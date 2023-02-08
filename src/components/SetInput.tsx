import { StyleSheet, Text, View } from 'react-native';
import { DigitInput } from './DigitInput';

export type Set = {
  weight?: string;
  repetitions?: string;
  targetWeight?: string;
  targetRepetitions?: string;
};

interface SetInputProps {
  handleSetInput: (arg0: Set) => void;
  set?: Set;
}

export const SetInput = (props: SetInputProps) => {
  const { handleSetInput, set } = props;

  return (
    <View style={ styles.container }>
      <Text>Weight: </Text>
      <DigitInput
        handleDigitInput={ weight => handleSetInput({ weight }) }
        initialValue={ set?.weight }
        placeholder={ set?.targetWeight }
      />
      <Text> Rep: </Text>
      <DigitInput
        handleDigitInput={ repetitions => handleSetInput({ repetitions }) }
        initialValue={ set?.repetitions }
        placeholder={ set?.targetRepetitions }
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
