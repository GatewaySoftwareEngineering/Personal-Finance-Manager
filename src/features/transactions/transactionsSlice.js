import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  loadState: 'idle',
  transactions: undefined,
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  () => {
    return getTransactions(); 
  }
); 

const transactionsSlice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => { 
      state.loadState = 'pending'
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loadState = 'loaded'
      state.transactions = action.payload
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loadState = 'failed'
    });
  },
});

export default transactionsSlice.reducer;
