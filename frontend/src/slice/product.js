// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   product: [],
//   isLoading: false,
//   error: null,
// };

// export const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducer: {
//     fetchProducts: (state, action) => {
//       state.isLoading = true;
//       state.product = action.payload;
//     },
//     startAddProduct: (state) => {
//       state.isLoading = true;
//     },
//     deleteProduct: (state, action) => {
//       state.isLoading = true;
//       state.product = state.product.filter(
//         (product) => product._id !== action.payload
//       );
//     },
//   },
// });

// export const { startAddProduct, fetchProducts, deleteProduct } =
//   productSlice.actions;

// export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    startAddProduct: (state) => {
      state.isLoading = true;
    },
    fetchProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    createProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id
          ? action.payload.updatedProduct
          : product
      );
    },
  },
});

export const {
  startAddProduct,
  fetchProducts,
  setError,
  deleteProduct,
  createProduct,
  updateProduct,
} = productSlice.actions;
export default productSlice.reducer;
