const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  active: "Overview",
};
const routerSlice = createSlice({
  name: "routeState",
  initialState,
  reducers: {
    setActiveRoute: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActiveRoute } = routerSlice.actions;

export default routerSlice.reducer;
