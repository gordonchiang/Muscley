import type { StackScreenProps } from '@react-navigation/stack';
import { Entry } from '../screens/AddOrEditEntryScreen';
import type { ExerciseItem } from '../screens/types';

export type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

export type CalendarStackParamList = {
  Calendar: { date: string };
  EditDate: {
    date: string;
    exerciseItem?: ExerciseItem;
  };
  AddOrEditEntry: {
    date: string;
    existingEntry?: {
      entry: Entry;
      index: number;
    };
    exerciseItem?: ExerciseItem;
  };
}

export type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
export type EditDateScreenProps = StackScreenProps<CalendarStackParamList, 'EditDate'>;
export type AddOrEditEntryScreenProps = StackScreenProps<CalendarStackParamList, 'AddOrEditEntry'>;
