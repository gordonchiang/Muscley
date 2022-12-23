import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { EditDayScreenProps } from '../navigation/types';
import { useAppDispatch } from '../redux/hooks';
import { saveDataForSelectedDate } from '../redux/selectedDateSlice';
import DigitInput from '../components/DigitInput';

const EditDayScreen = (props: EditDayScreenProps) => {
  const { navigation, route: { params: { dateString } } } = props;

  const [ text, onChangeText ] = useState('');

  const dispatch = useAppDispatch();

  const handleDigitInput = (input: string) => {
    onChangeText(input);
  };

  return (
    <View>
      <Text>EditDay Screen</Text>
      <DigitInput handleDigitInput={ handleDigitInput } />
      <Button
        title='Add Exercise'
        onPress={ async () => {
          try {
            await dispatch(saveDataForSelectedDate({ date: dateString, data: text }));
            navigation.goBack();
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
