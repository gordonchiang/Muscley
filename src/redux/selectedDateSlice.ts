import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dateToDateString } from '../utils/dateFunctions';

export interface SelectedDateState {
  date: string;
  data?: unknown;
}

export const fetchDataForSelectedDate = createAsyncThunk<SelectedDateState, string>(
  'selectedDate/dataFetchStatus',
  async (date: string) => {
    let data = null;

    try {
      const serializedData = await AsyncStorage.getItem(date);
      if (serializedData) data = JSON.parse(serializedData);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error fetching selectedDate data for ${date}`, e);
    }

    return { date, data };
  }
);

export const saveDataForSelectedDate = createAsyncThunk<SelectedDateState, { date: string; data?: unknown }>(
  'selectedDate/dataSaveStatus',
  async (arg) => {
    const { date, data } = arg;

    if (!data) return { date };

    try {
      await AsyncStorage.setItem(date, JSON.stringify(data));
      return { date, data };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error saving selectedDate data for ${date}`, e);
      return { date };
    }
  }
);

const initialState: SelectedDateState = {
  date: dateToDateString(new Date()),
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
