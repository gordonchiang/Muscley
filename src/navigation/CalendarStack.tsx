import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParamList } from './types';
import { CalendarScreen } from '../screens/CalendarScreen';
import { EditDateScreen } from '../screens/EditDateScreen';
import { EditEntryScreen } from '../screens/EditEntryScreen';
import { dateToDateString } from '../utils/dateFunctions';

const Stack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack = () => {
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
        name='EditDate'
        component={ EditDateScreen }
        options={ { presentation: 'modal' } }
      />
      <Stack.Screen
        name='EditEntry'
        component={ EditEntryScreen }
        options={ { presentation: 'modal' } }
      />
    </Stack.Navigator>
  );
};
