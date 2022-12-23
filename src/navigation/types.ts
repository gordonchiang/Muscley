import type { StackScreenProps } from '@react-navigation/stack';

type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

type CalendarStackParamList = {
  Calendar: {
    dateString: string;
  };
  EditDate: {
    dateString: string;
  };
}

type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
type EditDateScreenProps = StackScreenProps<CalendarStackParamList, 'EditDate'>;

export {
  RootDrawerParamList,
  CalendarStackParamList,
  CalendarScreenProps,
  EditDateScreenProps,
};
