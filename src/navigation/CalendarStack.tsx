import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParameters } from './types';
import Calendar from '../screens/Calendar';

const Stack = createStackNavigator<CalendarStackParameters>();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Calendar' component={ Calendar } />
    </Stack.Navigator>
  );
};

export default CalendarStack;
