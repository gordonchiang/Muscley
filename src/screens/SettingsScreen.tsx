import { Button, View } from 'react-native';
import { clear, getAllKeys } from '../api/localStorage';

export const SettingsScreen = () => {
  return (
    <View>
      <Button
        title='Delete all data'
        onPress={ async () => {
          const keys = await getAllKeys();
          await clear();
          // eslint-disable-next-line no-console
          console.log('Removed: ', keys);
        } }
      />
    </View>
  );
};
