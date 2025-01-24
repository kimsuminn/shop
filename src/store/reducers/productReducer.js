import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/kimsuminn/shop/products');
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
}

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    })
    .addCase(fetchDetailProduct.fulfilled, (state, action) => {
      state.detailProduct = action.payload;
    })
  }
})

export default productReducer.reducer;