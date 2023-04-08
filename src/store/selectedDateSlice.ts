/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dateObjectToString } from '../util/date';
import { deleteFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from '../api/localStorage';
import { Entry } from '../screens/AddOrEditEntryScreen';

export interface SelectedDateState {
  date: string;
  entries: Entry[];
}

export const addSelectedDatePrefix = (date: string): string => `selectedDate_${date}`;

export const fetchDataForSelectedDate = createAsyncThunk<SelectedDateState, string>(
  'selectedDate/dataFetchStatus',
  async (date: string) => {
    const data = await getFromLocalStorage(addSelectedDatePrefix(date));
    return { date, entries: data as Entry[] };
  }
);

export const saveDataForSelectedDate = createAsyncThunk<SelectedDateState, { date: string; entries: Entry[] }>(
  'selectedDate/dataSaveStatus',
  async (arg) => {
    const { date, entries } = arg;
    await saveToLocalStorage(addSelectedDatePrefix(date), entries);
    return { date, entries };
  }
);

export const deleteDataForSelectedDate = createAsyncThunk<SelectedDateState, { date: string; entry: Entry, index: number }>(
  'selectedDate/dataDeleteStatus',
  async (arg) => {
    const { date, entry: { key }, index } = arg;

    const entries = await getFromLocalStorage(addSelectedDatePrefix(date)) as Entry[];

    entries.splice(index, 1);
    await deleteFromLocalStorage(key);

    await saveToLocalStorage(addSelectedDatePrefix(date), entries);
    return { date, entries };
  }
);

const initialState: SelectedDateState = {
  date: dateObjectToString(new Date()),
  entries: [],
};

export const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState,
  reducers: {
    selectDate: (_, action: PayloadAction<SelectedDateState>) => {
      const { payload: { date, entries } } = action;
      return { date, entries };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataForSelectedDate.fulfilled, (_, action: PayloadAction<SelectedDateState>) => {
        const { payload: { date, entries } } = action;
        return { date, entries };
      })
      .addCase(saveDataForSelectedDate.fulfilled, (_, action: PayloadAction<SelectedDateState>) => {
        const { payload: { date, entries } } = action;
        return { date, entries };
      })
      .addCase(deleteDataForSelectedDate.fulfilled, (_, action: PayloadAction<SelectedDateState>) => {
        const { payload: { date, entries } } = action;
        return { date, entries };
      });
  },
});

export const { selectDate } = selectedDateSlice.actions;

export default selectedDateSlice.reducer;
