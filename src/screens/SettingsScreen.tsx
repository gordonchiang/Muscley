import { Button, View } from 'react-native';
import { clearLocalStorage, getAllKeysFromLocalStorage } from '../api/localStorage';
import { SettingsScreenProps } from '../navigation/types';

export const SettingsScreen = (props: SettingsScreenProps) => {
  const { navigation } = props;

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
      <Button
        title='Import training program'
        onPress={ () => navigation.navigate('Onboarding') }
      />
    </View>
  );
};
