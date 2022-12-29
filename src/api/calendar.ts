import type { SelectedDateState } from '../redux/selectedDateSlice';
import type { ExerciseItem } from '../screens/types';

export type AgendaListItems = [ {
  title: string;
  data: [ ExerciseItem ] | [ Record<string, never> ];
} ];

export const selectedDateStateToAgendaListItem = (item: SelectedDateState): AgendaListItems => {
  const { date: title, data } = item;

  return [ {
    title,
    data: data ? [ { title: JSON.stringify(data), date: title, data } ] : [ {} ],
  } ];
};
