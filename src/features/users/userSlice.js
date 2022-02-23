import { createSlice } from "@reduxjs/toolkit";

const fmUser = JSON.parse(localStorage.getItem('fm-user'));
const user = {
  ...fmUser
} 
 
const userSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: fmUser ? user : null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('fm-user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('fm-user');
    }
  }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;


