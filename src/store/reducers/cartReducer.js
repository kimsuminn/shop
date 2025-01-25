import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
}

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      let idList = state.cartList.map(item => ({
        id: item.id, 
        selectSize: item.selectSize 
      }));

      if (idList.some(item => item.id === action.payload.product.id && item.selectSize === action.payload.size)) {
        let newList = state.cartList.map(item => {
          if (item.id === action.payload.product.id && item.selectSize === action.payload.size) {
            return { ...item, count: item.count + 1 }
          }

          return item;
        })

        state.cartList = newList;
      } else {
        state.cartList.push({ ...action.payload.product, date: Date.now(), count: 1, selectSize: action.payload.size })
      }
    },
    removeCart(state, action) {
      let newList = state.cartList.filter(item => item.date !== action.payload.date);
      state.cartList = newList;
    },
    addCount(state, action) {
      let newList = state.cartList.map(item => {
        if (item.date === action.payload.date) {
          return {...item, count: item.count + 1};
        }

        return item;
      })

      state.cartList = newList;
    },
    subCount(state, action) {
      let newList = state.cartList.map(item => {
        if (item.date === action.payload.date) {
          return {...item, count: item.count - 1 > 0 ? item.count - 1 : item.count};
        }

        return item;
      })

      state.cartList = newList;
    }
  }
})

export const { addCart, removeCart, addCount, subCount } = cartReducer.actions;
export default cartReducer.reducer;