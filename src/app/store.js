import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
