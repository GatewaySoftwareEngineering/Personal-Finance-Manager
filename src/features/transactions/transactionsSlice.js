import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockData } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  loadState: 'idle',
  transactions: undefined,
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  () => {
    const transactionsInStroe = JSON.parse(localStorage.getItem('fm-transactions'));
    let data;
    if (transactionsInStroe) data = transactionsInStroe;
    else data = mockData;
    return data;
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
      state.transactions = action.payload; 
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loadState = 'failed'
    });
  },
});

export default transactionsSlice.reducer;
