import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingParamList } from './types';
import { InputMaxes } from '../screens/InputMaxes';
import { ReviewProgress } from '../screens/ReviewProgress';

const Stack = createStackNavigator<OnboardingParamList>();

export const Onboarding = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='InputMaxes'
        component={ InputMaxes }
      />
      <Stack.Screen
        name='ReviewProgress'
        component={ ReviewProgress }
      />
    </Stack.Navigator>
  );
};
