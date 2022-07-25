import { combineReducers, configureStore } from "@reduxjs/toolkit";
import routeSlice from "src/features/routestate/routeSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
const reducers = combineReducers({
  transactions: transactionsReducer,
  routeState: routeSlice,
});
const persistConfig = {
  key: "root",
  //  whitelist: ["transactions"],
  storage,
  version:1
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
