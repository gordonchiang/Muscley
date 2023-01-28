import type { StackScreenProps } from '@react-navigation/stack';
import type { ExerciseItem } from '../screens/types';

export type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

export type CalendarStackParamList = {
  Calendar: { dateString: string };
  EditDate: { dateString: string, exerciseItem?: ExerciseItem };
  ViewExercise: { dateString: string, exerciseItem: ExerciseItem };
}

export type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
export type EditDateScreenProps = StackScreenProps<CalendarStackParamList, 'EditDate'>;
export type ViewExerciseScreenProps = StackScreenProps<CalendarStackParamList, 'ViewExercise'>;
