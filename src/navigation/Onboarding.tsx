import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingParamList } from './types';
import { InputNaxes } from '../screens/InputMaxes';

const Stack = createStackNavigator<OnboardingParamList>();

export const Onboarding = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='InputNaxes'
        component={ InputNaxes }
      />
    </Stack.Navigator>
  );
};
