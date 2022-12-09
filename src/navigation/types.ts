import type { StackScreenProps } from '@react-navigation/stack';

type RootDrawerParamList = {
  CalendarStack: undefined;
  Settings: undefined;
};

type CalendarStackParamList = {
  Calendar: undefined;
  EditDay: {
    dateString: string;
  };
}

type EditDayScreenProps = StackScreenProps<CalendarStackParamList, 'EditDay'>;

export {
  RootDrawerParamList,
  CalendarStackParamList,
  EditDayScreenProps,
};
