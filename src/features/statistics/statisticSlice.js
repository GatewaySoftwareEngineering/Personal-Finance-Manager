/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockData } from "../transactions/transactionsAPI";

const name = "statistics";

const initialState = {
  loadState: 'idle',
  statistics: {
    total: undefined,
    income: undefined,
    expence: undefined,
  },
};

export const fetchStatstics = createAsyncThunk(
  `${name}/fetchStatstics`,
  async () => {
    const transactionsInStroe = JSON.parse(localStorage.getItem('fm-transactions'));
    let data;
    if (transactionsInStroe) data = transactionsInStroe;
    else data = mockData;
 
    const incomeArr = [];
    data.map((val) => {
      if (val.type === 'Income') incomeArr.push(val.amount); 
    }) 
    const income = incomeArr.reduce(
      (previousValue, currentValue) => previousValue + currentValue, 0
    );

    const expenseArr = [];
    data.map((val) => {
      if (val.type === 'Expense') expenseArr.push(val.amount); 
    });
    const expense = expenseArr.reduce(
      (previousValue, currentValue) => previousValue + currentValue, 0
    );

    const body = {
      total: income + expense,
      income,
      expense,
    }

    return body;
  }
);

const statisticSlice = createSlice({
  name,
  initialState,
});

export default statisticSlice.reducer;
