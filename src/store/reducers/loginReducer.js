import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
}

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state) {
      state.status = true;
    },
    logout(state) {
      state.status = false;
    }
  }
})

export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;