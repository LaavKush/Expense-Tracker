import { createSlice } from '@reduxjs/toolkit';

interface Category {
  id: string;
  name: string;
}

const initialCategories: Category[] = [
  { id: '1', name: 'food' },
  { id: '2', name: 'groceries' },
  { id: '3', name: 'travel' },
  { id: '4', name: 'bills' },
  { id: '5', name: 'donation' },
  { id: '6', name: 'education' },
  { id: '7', name: 'entertainment' },
  { id: '8', name: 'insurance' },
  { id: '9', name: 'loans' },
  { id: '10', name: 'miscellaneous' },
];

interface CategoriesState {
  list: Category[];
}

const initialState: CategoriesState = {
  list: initialCategories,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
