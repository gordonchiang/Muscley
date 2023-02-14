/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dateObjectToString } from '../utils/date';
import { deleteFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from '../api/localStorage';
import { Entry } from '../screens/AddOrEditEntryScreen';

export interface SelectedDateState {
  date: string;
  entries?: Entry[];
}

export const addSelectedDatePrefix = (date: string): string => `selectedDate_${date}`;

export const fetchDataForSelectedDate = createAsyncThunk<SelectedDateState, string>(
  'selectedDate/dataFetchStatus',
  async (date: string) => {
    const data = await getFromLocalStorage(addSelectedDatePrefix(date));
    return data ? { date, entries: data as Entry[] } : { date };
  }
);

export const saveDataForSelectedDate = createAsyncThunk<SelectedDateState, { date: string; entries?: Entry[] }>(
  'selectedDate/dataSaveStatus',
  async (arg) => {
    const { date, entries } = arg;

    if (!entries) return { date };

    try {
      await saveToLocalStorage(addSelectedDatePrefix(date), entries);
      return { date, entries };
    } catch (e) {
      return { date };
    }
  }
);

export const deleteDataForSelectedDate = createAsyncThunk<SelectedDateState, { date: string; entry: Entry, index: number }>(
  'selectedDate/dataDeleteStatus',
  async (arg) => {
    const { date, entry: { key }, index } = arg;

    try {
      const entries = await getFromLocalStorage(addSelectedDatePrefix(date)) as Entry[];
      console.log(entries);
      entries.splice(index, 1);

      console.log(entries);
      await deleteFromLocalStorage(key);
      console.log(key);

      if (entries.length === 0) {
        await deleteFromLocalStorage(addSelectedDatePrefix(date));        
        return { date };
      }

      await saveToLocalStorage(addSelectedDatePrefix(date), entries);
      return { date, entries };
    } catch (e) {
      console.log(e);
      return { date };
    }
  }
);

const initialState: SelectedDateState = {
  date: dateObjectToString(new Date()),
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
