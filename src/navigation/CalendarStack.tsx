import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParamList } from './types';
import { CalendarScreen } from '../screens/CalendarScreen';
import { AddOrEditEntryScreen } from '../screens/AddOrEditEntryScreen';

const Stack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Calendar'
        component={ CalendarScreen }
      />
      <Stack.Screen
        name='AddOrEditEntry'
        component={ AddOrEditEntryScreen }
        options={ { presentation: 'modal' } }
      />
    </Stack.Navigator>
  );
};
