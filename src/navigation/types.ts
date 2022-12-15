import type { StackScreenProps } from '@react-navigation/stack';

type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

type CalendarStackParamList = {
  Calendar: {
    dateString: string;
    dayItem?: {
      title: string,
      data: Record<string, unknown>[],
    }
  };
  EditDay: {
    dateString: string;
  };
}

type CalendarScreenProps = StackScreenProps<CalendarStackParamList, 'Calendar'>;
type EditDayScreenProps = StackScreenProps<CalendarStackParamList, 'EditDay'>;

export {
  RootDrawerParamList,
  CalendarStackParamList,
  CalendarScreenProps,
  EditDayScreenProps,
};
