import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  transactions: [],
  loading: false,
  error: undefined,
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  async () => {
    const result = await getTransactions();
    return result;
  }
);

const transactionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addTransactions: (state, action) => {
      state.transactions = [...state.transactions, action.payload];
    },
  },
  extraReducers: {
    [fetchTransactions.pending](state) {
      state.loading = true;
    },
    [fetchTransactions.fulfilled](state, action) {
      state.transactions = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    [fetchTransactions.rejected](state, action) {
      state = { ...state, loading: false, error: "failed from load data!" };
    },
  },
});

export const {addTransactions}=transactionsSlice.actions;
export default transactionsSlice.reducer;
