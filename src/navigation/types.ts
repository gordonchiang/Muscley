import type { StackScreenProps } from '@react-navigation/stack';
import { Entry } from '../screens/EditEntryScreen';
import type { ExerciseItem } from '../screens/types';

export type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

export type CalendarStackParamList = {
  Calendar: { dateString: string };
  EditDate: {
    dateString: string,
    handleAddExercise: (arg0: ExerciseItem) => void;
    exerciseItem?: ExerciseItem,
  };
  EditEntry: { dateString: string, entry?: Entry };
}

export type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
export type EditDateScreenProps = StackScreenProps<CalendarStackParamList, 'EditDate'>;
export type EditEntryScreenProps = StackScreenProps<CalendarStackParamList, 'EditEntry'>;
