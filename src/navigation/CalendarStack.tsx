import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParamList } from './types';
import CalendarScreen from '../screens/CalendarScreen';
import EditDayScreen from '../screens/EditDayScreen';

const Stack = createStackNavigator<CalendarStackParamList>();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Calendar' component={ CalendarScreen } />
      <Stack.Screen name='EditDay' component={ EditDayScreen } options={ { presentation: 'modal' } } />
    </Stack.Navigator>
  );
};

export default CalendarStack;
