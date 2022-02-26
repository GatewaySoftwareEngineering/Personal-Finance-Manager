import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockData } from "../transactionsAPI";

import _ from 'lodash';
import moment from 'moment';

const name = "history";
const dateFormat = 'YYYY-MM-DD';

const initialState = {
  loadState: 'idle',
  transactions: undefined,
};

export const historyTransactions = createAsyncThunk(
  `${name}/historyTransactions`,
  async (query) => {
    console.log(query, 'query')
    const transactionsInStroe = JSON.parse(localStorage.getItem('fm-transactions'));
    let data;
    if (transactionsInStroe) data = transactionsInStroe;
    else data = mockData;

    // sortd the date in chronological order
    const sortByDate = data.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });

    // console.log(sortByDate)

    return sortByDate;
  }
);

const historySlice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(historyTransactions.pending, (state) => {
      state.loadState = 'pending';
    });
    builder.addCase(historyTransactions.fulfilled, (state, action) => {
      state.loadState = 'loaded';
      state.transactions = action.payload;
    });
    builder.addCase(historyTransactions.rejected, (state) => {
      state.loadState = 'failed';
    });
  },
});

export default historySlice.reducer;