import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";
import walletReducer from "../features/wallet/walletSlice";
export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    wallet: walletReducer,
  },
});
