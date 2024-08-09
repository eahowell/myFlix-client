import { createSlice } from "@reduxjs/toolkit";


const tokenSlice = createSlice({
  name: "token",
  initialState: null,
  reducers: {
    setToken: (state, action) => action.payload
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
