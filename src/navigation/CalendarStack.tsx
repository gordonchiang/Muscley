import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParamList } from './types';
import CalendarScreen from '../screens/CalendarScreen';
import EditDayScreen from '../screens/EditDayScreen';
import { dateToDateString } from '../utils/dateFunctions';

const Stack = createStackNavigator<CalendarStackParamList>();

const CalendarStack = () => {
  const today = new Date();
  const todayDateString = dateToDateString(today);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Calendar'
        component={ CalendarScreen }
        initialParams={ { dateString: todayDateString } }
      />
      <Stack.Screen
        name='EditDay'
        component={ EditDayScreen }
        options={ { presentation: 'modal' } }
      />
    </Stack.Navigator>
  );
};

export default CalendarStack;
