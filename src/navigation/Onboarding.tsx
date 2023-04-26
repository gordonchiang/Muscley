import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingParamList } from './types';
import { InputMaxes } from '../screens/InputMaxes';

const Stack = createStackNavigator<OnboardingParamList>();

export const Onboarding = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='InputMaxes'
        component={ InputMaxes }
      />
    </Stack.Navigator>
  );
};
