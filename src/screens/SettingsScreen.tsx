import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const deleteData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('removed: ', keys);

      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Button
        title='Delete all data'
        onPress={ async () => {
          await deleteData();
        } }
      />
    </View>
  );
};

export default SettingsScreen;
