import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/userSlice';
import statisticReducer from "../features/statistics/statisticSlice";
import historyReducer from "../features/transaction-history/historySlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    statistics: statisticReducer,
    historyReducer: historyReducer,
    transactions: transactionsReducer,
  },
});
