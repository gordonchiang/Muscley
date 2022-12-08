import { createDrawerNavigator } from '@react-navigation/drawer';
import type { RootDrawerParamList } from './types';
import CalendarStack from './CalendarStack';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const RootDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='CalendarStack' component={ CalendarStack } />
      <Drawer.Screen name='Settings' component={ SettingsScreen } />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
