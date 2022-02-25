import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockData } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  loadState: 'idle',
  transactions: undefined,
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  async (query) => {
    const transactionsInStroe = JSON.parse(localStorage.getItem('fm-transactions'));
    let data;
    if (transactionsInStroe) data = transactionsInStroe;
    else data = mockData;

    if (query.limit) data = data.slice(0, query.limit);

    return data.reverse();
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
