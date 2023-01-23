import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    data_user: JSON.parse(localStorage.getItem("data_user")) || null,
    validated:
      JSON.parse(localStorage.getItem("data_user")) === null ? false : true,
  },
  reducers: {
    add_user: (state, action) => {
      state.validated = true;
      state.data_user = action.payload;
    },
    logout_user: (state) => {
      state.data_user = null;
    },
    update_user: (state, action) => {
      state.data_user = action.payload;
    },
  },
}); 

export const { add_user, logout_user, update_user } = userSlice.actions;
export const user = (state) => state.users;
export default userSlice.reducer;
