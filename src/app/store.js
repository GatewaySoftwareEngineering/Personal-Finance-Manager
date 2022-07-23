import { configureStore } from "@reduxjs/toolkit";
import routeSlice from "src/features/routestate/routeSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    routeState: routeSlice,
  },
});
