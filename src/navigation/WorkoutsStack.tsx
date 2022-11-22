import { createStackNavigator } from '@react-navigation/stack';
import type { WorkoutsStackParameters } from './types';
import Workouts from '../screens/Workouts';

const Stack = createStackNavigator<WorkoutsStackParameters>();

const WorkoutsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Workouts' component={ Workouts } />
    </Stack.Navigator>
  );
};

export default WorkoutsStack;
