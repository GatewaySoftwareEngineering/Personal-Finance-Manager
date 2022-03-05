import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWalletData } from "./walletApi";

const initialState = {
  loading: false,
  wallet: [],
  error: "",
};

export const fetchWalletData = createAsyncThunk(
  "wallet/fetchWalletData",
  async () => {
    const wallet = await getWalletData();
    return JSON.parse(wallet);
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWalletData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWalletData.fulfilled, (state, action) => {
      state.loading = false;
      state.wallet = action.payload;
    });
    builder.addCase(fetchWalletData.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong! try again later!";
    });
  },
});

export default walletSlice.reducer;
