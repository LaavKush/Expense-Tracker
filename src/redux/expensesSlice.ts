import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
  id: string;
  title: string;
  amount: number;
  dateAdded: string;
  category: string;
}

interface ExpensesState {
  list: Expense[];
}

const LOCAL_STORAGE_KEY = "expenses";

// Load initial state from localStorage
const initialState: ExpensesState = {
    list: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]").sort(
        (a: Expense, b: Expense) => {
            const dateA = new Date(a.dateAdded);
            const dateB = new Date(b.dateAdded);
            return dateB.getTime() - dateA.getTime(); // Descending order
        }
    ),
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.list.push(action.payload);
      saveToLocalStorage(state.list);
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.list = state.list.filter((expense) => expense.id !== action.payload);
      saveToLocalStorage(state.list);
    },
  },
});

// Helper function to save to localStorage
function saveToLocalStorage(expenses: Expense[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
}

export const { addExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
