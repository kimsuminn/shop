import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './reducers/loginReducer';
import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
  }
});

export default store;