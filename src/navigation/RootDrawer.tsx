import { createDrawerNavigator } from '@react-navigation/drawer';
import type { RootDrawerParameters } from './types';
import CalendarStack from './CalendarStack';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator<RootDrawerParameters>();

const RootDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='CalendarStack' component={ CalendarStack } />
      <Drawer.Screen name='Settings' component={ Settings } />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
