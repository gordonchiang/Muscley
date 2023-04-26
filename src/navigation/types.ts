import type { StackScreenProps } from '@react-navigation/stack';
import { Entry } from '../screens/AddOrEditEntryScreen';

export type RootDrawerParamList = {
  CalendarStack: undefined;
  Onboarding: undefined;
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
}

export type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
export type AddOrEditEntryScreenProps = StackScreenProps<CalendarStackParamList, 'AddOrEditEntry'>;

export type OnboardingParamList = {
  CalendarStack: { screen: string };
  InputMaxes: undefined;
}

export type InputMaxesScreenProps = StackScreenProps<OnboardingParamList, 'InputMaxes'>;
