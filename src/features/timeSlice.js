import {createSlice } from "@reduxjs/toolkit";
const initialState = {
  timeName: 'This Week'
};


const changeTimeName = createSlice({
  name:'changeTime',
  initialState,
  reducers:{
    changeTime:(state,action)=>{
        state.timeName=action.payload
    }
   
  }
});

export const {changeTime}=changeTimeName.actions;
export default changeTimeName.reducer;
