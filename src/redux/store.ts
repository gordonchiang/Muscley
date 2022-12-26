import { configureStore } from '@reduxjs/toolkit';
import selectedDateSliceReducer from './selectedDateSlice';

export const store = configureStore({
  reducer: {
    selectedDate: selectedDateSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
