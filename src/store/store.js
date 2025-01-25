import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './reducers/loginReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
    cart: cartReducer,
  }
});

export default store;