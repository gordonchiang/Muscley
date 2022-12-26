import { StyleSheet, Text, View } from 'react-native';
import { DigitInput } from './DigitInput';

type Set = {
  weight?: string;
  reps?: string;
};

export type IndexedSet = Set & {
  index?: number;
};

interface SetInputProps {
  handleSetInput: (arg0: Set | IndexedSet) => void;
  index?: number;
  weightPlaceholder?: string;
  repsPlaceholder?: string;
}

export const SetInput = (props: SetInputProps) => {
  const { handleSetInput, index, weightPlaceholder, repsPlaceholder } = props;

  return (
    <View style={ styles.container }>
      <Text>Weight: </Text>
      <DigitInput
        handleDigitInput={ weight => handleSetInput({ index, weight }) }
        placeholder={ weightPlaceholder }
      />
      <Text> Rep: </Text>
      <DigitInput
        handleDigitInput={ reps => handleSetInput({ index, reps }) }
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
