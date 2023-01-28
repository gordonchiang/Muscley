import { Button, Text, View } from 'react-native';
import { EditEntryScreenProps } from '../navigation/types';

export const EditEntryScreen = (props: EditEntryScreenProps) => {
  const { navigation, route: { params: { dateString } } } = props;

  return (
    <View>
      <Text>Edit Entry Screen</Text>
      <Text>{ dateString }</Text>
      <Button
        title='Go Back'
        onPress={ () => navigation.goBack() }
      />
    </View>
  );
};
