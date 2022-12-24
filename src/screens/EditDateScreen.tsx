import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { EditDateScreenProps } from '../navigation/types';
import { useAppDispatch } from '../redux/hooks';
import { saveDataForSelectedDate } from '../redux/selectedDateSlice';
import SetDigitInput, { SetDigit } from '../components/SetDigitInput';

const EditDateScreen = (props: EditDateScreenProps) => {
  const { navigation, route: { params: { dateString } } } = props;

  const [ set, changeSet ] = useState<SetDigit>({});

  const dispatch = useAppDispatch();

  const handleSetDigitInput = ({ weight, reps }: SetDigit) => {
    changeSet({
      ...set,
      ...(weight && { weight }),
      ...(reps && { reps }),
    });
  };

  return (
    <View>
      <Text>EditDate Screen</Text>
      <SetDigitInput handleSetDigitInput={ handleSetDigitInput } />
      <Button
        title='Add Exercise'
        onPress={ async () => {
          try {
            await dispatch(saveDataForSelectedDate({ date: dateString, data: set }));
            navigation.goBack();
          } catch(e) {
            console.log('Error in EditDateScreen', e);
            navigation.goBack();
          }
        } }
      />
    </View>
  );
};

export default EditDateScreen;
