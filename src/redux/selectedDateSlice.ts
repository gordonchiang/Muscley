import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dateObjectToString } from '../utils/dateFunctions';
import { getFromLocalStorage, saveToLocalStorage } from '../api/localStorage';

export interface SelectedDateState {
  date: string;
  data?: unknown;
}

const addSelectedDatePrefix = (date: string): string => `selectedDate_${date}`;

export const fetchDataForSelectedDate = createAsyncThunk<SelectedDateState, string>(
  'selectedDate/dataFetchStatus',
  async (date: string) => {
    return { date, data: await getFromLocalStorage(addSelectedDatePrefix(date)) };
  }
);

export const saveDataForSelectedDate = createAsyncThunk<SelectedDateState, { date: string; data?: unknown }>(
  'selectedDate/dataSaveStatus',
  async (arg) => {
    const { date, data } = arg;

    if (!data) return { date };

    try {
      await saveToLocalStorage(addSelectedDatePrefix(date), data);
      return { date, data };
    } catch (e) {
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
      const { payload: { date, data } } = action;
      return { date, data };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataForSelectedDate.fulfilled, (_, action: PayloadAction<SelectedDateState>) => {
        const { payload: { date, data } } = action;
        return { date, data };
      })
      .addCase(saveDataForSelectedDate.fulfilled, (_, action: PayloadAction<SelectedDateState>) => {
        const { payload: { date, data } } = action;
        return { date, data };
      });
  },
});

export const { selectDate } = selectedDateSlice.actions;

export default selectedDateSlice.reducer;
