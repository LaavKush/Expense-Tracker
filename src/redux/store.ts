import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
