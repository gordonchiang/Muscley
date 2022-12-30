import type { SelectedDateState } from '../redux/selectedDateSlice';
import type { ExerciseItem } from '../screens/types';

export type AgendaListItems = [ {
  title: string;
  data: [ ExerciseItem ] | [ Record<string, never> ];
} ];

export const selectedDateStateToAgendaListItem = (item: SelectedDateState): AgendaListItems => {
  const { date, data } = item;

  return [ {
    title: date,
    data: data ? [ data as ExerciseItem ] : [ {} ],
  } ];
};
