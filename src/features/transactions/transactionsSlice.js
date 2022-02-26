import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockData } from "./transactionsAPI";

import _ from 'lodash';
import moment from 'moment'

const name = "transactions";
const dateFormat = 'YYYY-MM-DD';

const initialState = {
  loadState: 'idle',
  transactions: undefined,
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  async (query) => {
    const transactionsInStroe = JSON.parse(localStorage.getItem('fm-transactions'));
    let data;
    if (transactionsInStroe) data = transactionsInStroe.reverse();
    else data = mockData.reverse();
 
    if (query.limit) data = data.slice(0, query.limit);

    // creating an array that has all the transactions in this week
    const thisWeeksDate = [
      moment().add(1, 'day').format(dateFormat),
      moment().subtract(1, 'week').format(dateFormat)
    ];
    const thisWeeksArray = _.filter(data, (obj) => {
      if (moment(obj.date).isBetween(thisWeeksDate[1], thisWeeksDate[0])) return obj;
    });

    // creating an array that has all the transactions in this Month
    const thisMonthsDate = [
      moment().add(1, 'day').format(dateFormat),
      moment().subtract(1, 'month').format(dateFormat)
    ];
    const thisMonthsArray = _.filter(data, (obj) => {
      if (moment(obj.date).isBetween(thisMonthsDate[1], thisMonthsDate[0])) return obj;
    });

    // creating an array that has all the transactions in this Year
    const thisYearsDate = [
      moment().add(1, 'day').format(dateFormat),
      moment().subtract(1, 'year').format(dateFormat)
    ];
    const thisYearsArray = _.filter(data, (obj) => {
      if (moment(obj.date).isBetween(thisYearsDate[1], thisYearsDate[0])) return obj;
    });

    let title;
    let newArray;
    if (thisWeeksArray.length !== 0) {
      title = 'This Week';
      newArray = thisWeeksArray;
    }
    else if (thisMonthsArray.length !== 0) {
      title = 'This Month';
      newArray = thisMonthsArray;
    }
    else if (thisYearsArray.length !== 0) {
      title = 'This Year';
      newArray = thisYearsArray;
    }
    else {
      title = 'Transactions';
      newArray = data;
    }

    return {
      title,
      data: newArray,
    };

    // return newArray;
  }
);

const transactionsSlice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loadState = 'pending';
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loadState = 'loaded'; 
      state.transactions = action.payload.data;
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loadState = 'failed';
    });
  },
});

export default transactionsSlice.reducer;
