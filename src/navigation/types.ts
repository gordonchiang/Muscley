import type { StackScreenProps } from '@react-navigation/stack';
import { Entry } from '../screens/AddOrEditEntryScreen';

export type RootDrawerParamList = {
  CalendarStack: undefined;
  Onboarding: { screen: string };
  Settings: undefined;
};

export type SettingsScreenProps = StackScreenProps<RootDrawerParamList, 'Settings'>;

export type CalendarStackParamList = {
  Calendar: { date?: string };
  AddOrEditEntry: {
    date: string;
    existingEntry?: {
      entry: Entry;
      index: number;
    };
  };
  Onboarding: { screen: string };
}

export type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
export type AddOrEditEntryScreenProps = StackScreenProps<CalendarStackParamList, 'AddOrEditEntry'>;

export type OnboardingParamList = {
  CalendarStack: { screen: string };
  InputMaxes: undefined;
  ReviewProgress: undefined;
}

export type InputMaxesScreenProps = StackScreenProps<OnboardingParamList, 'InputMaxes'>;
export type ReviewProgressScreenProps = StackScreenProps<OnboardingParamList, 'ReviewProgress'>;
