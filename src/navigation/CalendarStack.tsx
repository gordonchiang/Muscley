import { createStackNavigator } from '@react-navigation/stack';
import type { CalendarStackParamList } from './types';
import CalendarScreen from '../screens/CalendarScreen';
import ModalScreen from '../screens/ModalScreen';

const Stack = createStackNavigator<CalendarStackParamList>();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Calendar' component={ CalendarScreen } />
      <Stack.Screen name='Modal' component={ ModalScreen } options={ { presentation: 'modal' } } />
    </Stack.Navigator>
  );
};

export default CalendarStack;
