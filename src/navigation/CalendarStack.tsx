import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParameters } from './types';
import CalendarScreen from '../screens/CalendarScreen';

const Stack = createStackNavigator<CalendarStackParameters>();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Calendar' component={ CalendarScreen } />
    </Stack.Navigator>
  );
};

export default CalendarStack;
