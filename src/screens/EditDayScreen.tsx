import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        onPress={ async () => {
          try {
            await AsyncStorage.setItem(dateString, JSON.stringify(text));

            navigation.goBack();
            // navigation.navigate('Calendar', { dateString, dayItem: newItem });
          } catch(e) {
            console.log('Error in EditSayScreen', e);
            navigation.goBack();
          }
        } }
      />
    </View>
  );
};

export default EditDayScreen;
