import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (query) => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/kimsuminn/shop/products');
      if (query !== '') {
        switch (query) {
          case 'new':
            return response.data.filter(item => item.new);
          case 'outer':
            return response.data.filter(item => item.menu === 'Outer');
          case 'top':
            return response.data.filter(item => item.menu === 'Top');
          case 'bottom':
            return response.data.filter(item => item.menu === 'Bottom');
          default:
            return response.data.filter(item => item.title.includes(query));
        }
      }
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
)

export const fetchDetailProduct = createAsyncThunk(
  'product/fetchDetailProduct',
  async (id) => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/kimsuminn/shop/products/${id}`)
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
)

const initialState = {
  allProducts: [],
  detailProduct: null,
  allLoading: true,
  detailLoading: true,
}

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.allLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.allLoading = false;
      })
      .addCase(fetchDetailProduct.pending, (state, action) => {
        state.detailLoading = true;
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        state.detailProduct = action.payload;
        state.detailLoading = false;
      })
  }
})

export default productReducer.reducer;