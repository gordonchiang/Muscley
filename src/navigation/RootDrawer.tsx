import { createDrawerNavigator } from '@react-navigation/drawer';
import type { RootDrawerParameters } from './types';
import WorkoutsStack from './WorkoutsStack';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator<RootDrawerParameters>();

const RootDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='WorkoutsStack' component={ WorkoutsStack } />
      <Drawer.Screen name='Settings' component={ Settings } />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
