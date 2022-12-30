import type { SelectedDateState } from '../redux/selectedDateSlice';
import type { ExerciseItem } from '../screens/types';

export type AgendaListItems = [ {
  title: string;
  data: [ ExerciseItem ] | [ Record<string, never> ];
} ];

export const selectedDateStateToAgendaListItem = (item: SelectedDateState): AgendaListItems => {
  const { date, data } = item;

  if (!data) return [ { title: date, data: [ {} ] } ];

  const exerciseItem = data as ExerciseItem;

  return [ {
    title: date,
    data: [ { title: exerciseItem.title, date, data: exerciseItem } ],
  } ];
};
