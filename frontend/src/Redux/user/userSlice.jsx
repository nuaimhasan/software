import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: undefined,
  userLoading: true,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.loggedUser = action.payload.data;
      state.userLoading = action.payload.loading;
    },
  },
});

export const { userLoggedIn } = authSlice.actions;
export default authSlice.reducer;
