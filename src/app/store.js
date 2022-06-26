import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";
import modalReducer from "../features/modalSlice";
import timeReducer from "../features/timeSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    modal: modalReducer,
    time:timeReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
