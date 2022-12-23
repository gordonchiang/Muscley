import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface DigitInputProps {
  handleDigitInput(input: string): void;
  placeholder?: string;
  initialValue?: string;
}

const DigitInput = (props: DigitInputProps) => {
  const { handleDigitInput, placeholder, initialValue = '' } = props;

  const [ digitsString, changeDigits ] = useState(initialValue);

  const onChangeText = (text: string) => {
    const cleanedDigitsString = text.replace(/[^0-9]/g, '');
    changeDigits(cleanedDigitsString);
    handleDigitInput(cleanedDigitsString);
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.inputContainer } pointerEvents='none'>
        <TextInput
          placeholder={ placeholder }
          style={ styles.inputDisplay }
          textAlign='right'
          value={ digitsString }
        />
      </View>
      <View style={ styles.inputContainer }>
        <TextInput
          keyboardType='numeric'
          maxLength={ 4 }
          onChangeText={ onChangeText }
          style={ styles.inputDisplayHidden }
          textAlign='right'
          value={ digitsString }
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
    paddingRight: 5,
  },
  inputDisplayHidden: {
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingRight: 5,
    color: 'transparent',
  },
});

export default DigitInput;
