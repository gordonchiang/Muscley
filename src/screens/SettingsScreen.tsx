import { Button, View } from 'react-native';
import { clearLocalStorage, getAllKeysFromLocalStorage } from '../api/localStorage';

export const SettingsScreen = () => {
  return (
    <View>
      <Button
        title='Delete all data'
        onPress={ async () => {
          const keys = await getAllKeysFromLocalStorage();
          await clearLocalStorage();
          // eslint-disable-next-line no-console
          console.log('Removed: ', keys);
        } }
      />
    </View>
  );
};
