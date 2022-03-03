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

    let array = sortByDate;
    let filteredByNote;
    if (query.note) {
      filteredByNote = _.filter(array, (val) => val.note.includes(query.note.trim()));
      array = filteredByNote;
    }

    let filteredByType;
    if (query.type) {
      filteredByType = _.filter(array, (val) => val.type === query.type);
      array = filteredByType;
    }

    if (query.category?.length) {
      const resultArray = [];
      query.category.map((stringValue) => {
        return _.filter(array, (val) => {
          if (val.category === stringValue) {
            resultArray.push(val);
          }
        });
      })
      array = resultArray;
    }

    if (query.date_from) {
      const filterdByFromDate = [];
      const selectedDate = moment(query.date_from).format(dateFormat);   
      array.map((val) => {
        let date = moment(val.date).add(1, 'day').format(dateFormat); 
        if (moment(selectedDate).isBefore(date)) {
          return filterdByFromDate.push(val);
        } 
        return null;
      }) 
      array = filterdByFromDate;
    }

    if (query.date_to) {
      const filterdByToDate = [];
      const selectedToDate = moment(query.date_to).format(dateFormat); 
      array.map((val) => {
        let date = moment(val.date).subtract(1, 'day').format(dateFormat); 
        if (moment(selectedToDate).isAfter(date)) {
          return filterdByToDate.push(val);
        } 
        return null;
      }) 
      array = filterdByToDate;
    }

    if (query.date_range) {
      const ranges = [
        moment(query.date_range[0]).format(dateFormat),
        moment(query.date_range[1]).add(1, 'day').format(dateFormat),
      ];

      const filterdByDateRange = _.filter(data, (obj) => {
        if (moment(obj.date).isBetween(ranges[0], ranges[1])) return obj;
      });

      array = filterdByDateRange;
    } 
    return array;
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