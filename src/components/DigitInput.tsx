import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface DigitInputProps {
  handleDigitInput: (arg0: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const DigitInput = (props: DigitInputProps) => {
  const { handleDigitInput, initialValue = '', placeholder } = props;

  const [ digitString, setDigitString ] = useState<string>(initialValue);

  return (
    <View style={ styles.container }>
      <View style={ styles.inputContainer } pointerEvents='none'>
        <TextInput
          style={ styles.inputDisplay }
          value={ digitString }
          placeholder={ placeholder }
          textAlign='right'
        />
      </View>
      <View style={ styles.inputContainer }>
        <TextInput
          onChangeText={ input => {
            const cleanedDigitString = input.replace(/[^0-9]/g, '');
            setDigitString(cleanedDigitString);
            handleDigitInput(cleanedDigitString);
          } }
          style={ [ styles.inputDisplay, styles.hidden ] }
          value={ digitString }
          keyboardType='numeric'
          textAlign='right'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 50,
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  inputDisplay: {
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 5,
  },
  hidden: {
    color: 'transparent',
  },
});
