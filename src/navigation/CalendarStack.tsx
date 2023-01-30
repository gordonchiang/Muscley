import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParamList } from './types';
import { CalendarScreen } from '../screens/CalendarScreen';
import { EditDateScreen } from '../screens/EditDateScreen';
import { AddOrEditEntryScreen } from '../screens/AddOrEditEntryScreen';
import { dateObjectToDateString } from '../utils/dateFunctions';

const Stack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack = () => {
  const todayDateString = dateObjectToDateString(new Date());

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Calendar'
        component={ CalendarScreen }
        initialParams={ { date: todayDateString } }
      />
      <Stack.Screen
        name='EditDate'
        component={ EditDateScreen }
        options={ { presentation: 'modal' } }
      />
      <Stack.Screen
        name='AddOrEditEntry'
        component={ AddOrEditEntryScreen }
        options={ { presentation: 'modal' } }
      />
    </Stack.Navigator>
  );
};
