import type { SelectedDateState } from '../redux/selectedDateSlice';

export type AgendaListItems<T> = [ {
  title: string;
  data: T | [ Record<string, never> ];
} ];

export function selectedDateStateToAgendaListItem<T>(item: SelectedDateState): AgendaListItems<T> {
  const { date, entries } = item;

  return [ {
    title: date,
    data: entries ? entries as T : [ {} ],
  } ];
}
