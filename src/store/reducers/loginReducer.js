import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginState: false,
}

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state) {
      state.loginState = true;
    },
    logout(state) {
      state.loginState = false;
    }
  }
})

export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;