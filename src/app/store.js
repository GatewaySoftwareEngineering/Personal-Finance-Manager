import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/userSlice';
import transactionsReducer from "../features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    transactions: transactionsReducer,
  },
});
