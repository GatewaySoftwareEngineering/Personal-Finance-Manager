import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  transactions:[],
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions` ,
  () => {
    return getTransactions();
  }
);

const transactionsSlice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {});
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions=action.payload
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {});
  },
  reducers:{
    addTransactions:(state,action)=>{
        state.transactions.push(action.payload);
    },
    filterTransaction(state, action) {
      state.transactions = state.transactions.filter(job => job.note
        .toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  }
});

export const {addTransactions,filterTransaction}=transactionsSlice.actions;
export default transactionsSlice.reducer;
