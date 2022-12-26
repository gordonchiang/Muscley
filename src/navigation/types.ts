import type { StackScreenProps } from '@react-navigation/stack';

export type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

export type CalendarStackParamList = {
  Calendar: {
    dateString: string;
  };
  EditDate: {
    dateString: string;
  };
}

export type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
export type EditDateScreenProps = StackScreenProps<CalendarStackParamList, 'EditDate'>;
