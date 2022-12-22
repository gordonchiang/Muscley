import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import type { RootState } from './store';
import { dateToDateString } from '../utils/dateFunctions';

interface SelectedDateState {
  date: string;
  data?: unknown;
}

export const fetchDataForSelectedDate = createAsyncThunk<SelectedDateState, string>(
  'selectedDate/dataStatus',
  async (date: string) => {
    let data = null;

    try {
      const serializedData = await AsyncStorage.getItem(date);
      if (serializedData) data = JSON.parse(serializedData);
    } catch (e) {
      console.log(`Error fetching selectedDate data for ${date}`, e);
    }

    return { date, data };
  }
);

const today = new Date();
const todayDateString = dateToDateString(today);

const initialState: SelectedDateState = {
  date: todayDateString,
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
    builder.addCase(fetchDataForSelectedDate.fulfilled, (_, action: PayloadAction<SelectedDateState>) => {
      const { payload: { date, data } } = action;
      return { date, data };
    });
  },
});

export const { selectDate } = selectedDateSlice.actions;

export default selectedDateSlice.reducer;
