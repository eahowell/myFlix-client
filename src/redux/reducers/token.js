import { createSlice } from "@reduxjs/toolkit";


const tokenSlice = createSlice({
  name: "token",
  initialState: null,
  reducers: {
    setToken: (_, action) => action.payload
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
