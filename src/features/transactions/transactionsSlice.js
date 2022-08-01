import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  transactions: [],
};
export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  async () => {
    return await getTransactions();
  }
);

const transactionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addNewTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {});
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      return undefined;
    });
  },
});
export const { addNewTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
