import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import type { EditDayScreenProps } from '../navigation/types';

const EditDayScreen = (props: EditDayScreenProps) => {
  const { navigation, route: { params: { dateString } } } = props;

  const [ text, onChangeText ] = useState('');

  return (
    <View>
      <Text>EditDay Screen</Text>
      <TextInput
        style={ { borderWidth: 1 } }
        value={ text }
        onChangeText={ onChangeText }
      />
      <Text></Text>
      <Button
        title='Add Exercise'
        onPress={ () => {
          console.log(dateString, text);
          navigation.goBack();
        } }
      />
    </View>
  );
};

export default EditDayScreen;
