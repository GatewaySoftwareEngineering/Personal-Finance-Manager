import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, getTransactions } from "./transactionsAPI";
import { filterTransactionsService } from "../../services/transactionServices";

const name = "transactions";

const initialState = {
  loading: false,
  transactions: undefined,
  error: undefined,
  filteredTransactions: [],
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  async () => {
    const transactions = await getTransactions();
    return JSON.parse(transactions);
  }
);

export const handleAddTransaction = createAsyncThunk(
  `${name}/addTransaction`,
  async (data) => {
    const result = await addTransaction(data);
    return result;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(handleAddTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleAddTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload.data;
    });
    builder.addCase(handleAddTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
  reducers: {
    filterTransactions: (state, action) => {
      state.filteredTransactions = filterTransactionsService(
        action.payload.filterOptions,
        action.payload.transactions
      );
    },
  },
});

export const { filterTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
